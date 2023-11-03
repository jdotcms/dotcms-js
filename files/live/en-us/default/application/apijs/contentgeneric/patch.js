(function patch(context) {

    const request= context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;
    const command = request.getParameter('command');
    const id = request.json().get('identifier');
    const title = request.json().get('title');
    const body = request.json().get('body');
    const contentJson = {
        "identifier": id,
        "title": title,
        "contentType":"webPageContent",
        "contentHost": 'default',
        "body": body
    };

    class NotFoundError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

    const workflowOptions = {
        "comments": `This is an example fired ${command} by js api engine`,
    };
    function processOperation (contentJson, workflowOptions, operation, id) {

        switch (operation) {
            case 'publish':
                return workflows.firePublish(contentJson, workflowOptions);
            case 'unpublish':
                return workflows.fireUnpublish(contentJson, workflowOptions);
            case 'unarchive':
                return workflows.fireUnarchive(contentJson, workflowOptions);
            case 'delete':
                return workflows.fireDelete(contentJson, workflowOptions);
            case 'destroy':
                return workflows.fireDestroy(contentJson, workflowOptions);
            default:
                throw new NotFoundError(`There command ${operation} is unknown for the id ${id}`);
        }
    }

    try {

        const contentOut = processOperation(contentJson, workflowOptions, command, id);

        if (null == contentOut) {

            return response.status(404).text(`Contentlet could not be processed`);
        }

        const blockEditorBody = contentOut.get('body');
        const bodyOut = blockEditorBody.getJson() || blockEditorBody.toHtml();

        let contentJsonOut = {
            "identifier":contentOut.get('identifier'),
            "title": contentOut.get('title'),
            "body": bodyOut.toString()
        };

        return response.status(200).json(contentJsonOut);
    } catch (err) {

        if (err instanceof NotFoundError) {
            return response.status(404).text(`Contentlet ${id} not found, error: ${err.message}`);
        }
        return response.status(500).text(`Error on getting contentlet` + err);
    }
})
