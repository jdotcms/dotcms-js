(function post(context) {

    const request= context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;
    const title = request.json().get('title');
    const body = request.json().get('body');
    const contentJson = {
        "title": title,
        "contentType":"webPageContent",
        "contentHost": 'default',
        "body": body
    };

    const workflowOptions = {
        "comments": "This is an example fired NEW by js api engine",
    };

    const contentOut = workflows.fireNew(contentJson, workflowOptions);

    if (null == contentOut) {

        return response.status(404).text(`Contentlet could not be created`);
    }

    const blockEditorBody = contentOut.get('body');
    const bodyOut = blockEditorBody.getJson() || blockEditorBody.toHtml();

    let contentJsonOut = {
        "identifier":contentOut.get('identifier'),
        "title": contentOut.get('title'),
        "body": bodyOut.toString()
    };

    return response.status(200).json(contentJsonOut);
})
