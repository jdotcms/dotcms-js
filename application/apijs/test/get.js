(function get(context) {
    
    
    let request = context.getRequest();
    let dotlogger = context.getLogger();
    let headers = request.getHeaders();
    dotlogger.info("getBodyUsed = " + request.getBodyUsed());
    let name = request.getParameter('name');

    return ` This is get test <b>${name}</b> `;

    
})

