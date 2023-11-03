(function post(context) {
    
    
    let request   = context.getRequest();
    let response  = context.getResponse();
    let dotlogger = context.getLogger();
    let headers = request.getHeaders();
    let message = bodyMap.get('message');
    let contentType = headers.get('content-type');
    let method = request.getMethod();
    let url    = request.getUrl();
    let formData = request.getFormData();
    let formDataName = formData.get('name');
    let userName = user.getFullName();

    dotlogger.info("getBodyUsed = " + request.getBodyUsed());
    dotlogger.info(`message = ${message}`);
    dotlogger.info(`Header Content Type = ${contentType}`);
    dotlogger.info(`Request Method = ${method}`);
    dotlogger.info(`Request url = ${url}`);
    dotlogger.info(`FormDataName = ${formDataName}`);
    dotlogger.info(`userName = ${userName}`);
    
    response.ok().text(`message received from the request: ${message} ok`);
})


