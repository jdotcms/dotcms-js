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
    
    
    var sitePersonel = {};
    var employees = []
    sitePersonel.employees = employees;
   // dotlogger.info(sitePersonel);
    
    var firstName = "John";
    var lastName = "Smith";
    var employee = {
      "firstName": firstName,
      "lastName": lastName
    }
    sitePersonel.employees.push(employee);
//    dotlogger.info(sitePersonel);
    
    var manager = "Jane Doe";
    sitePersonel.employees[0].manager = manager;
//    dotlogger.info(sitePersonel);
    
    dotlogger.info(JSON.stringify(sitePersonel));
    
    //1)
    dotJSON.put('algo','valor');
    //return dotJSON;
    
    //2)
    //return `hello algo ${formDataName}`;
    
    // 3)
    response.headers().append('content-type','application/json');
    return response.status(200).json(JSON.stringify(sitePersonel));
})