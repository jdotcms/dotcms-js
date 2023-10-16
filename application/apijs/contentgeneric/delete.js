(function put(context) {

    const request= context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;
    const id = request.json().get('identifier');
    const contentJson = {
        "identifier": id,
        "contentType":"webPageContent",
        "indexPolicy": "WAIT_FOR"
    };

    const workflowOptions = {
        "comments": "This is an example fired DELETE by js api engine",
    };

    workflows.fireArchive(contentJson, workflowOptions);

   // workflows.fireDelete(contentJson, workflowOptions);

    const contentJsonOut = {
        "message":"Contentlet deleted"
    }

    response.headers().append('content-type','application/json');
    return response.status(200).json(contentJsonOut);
})