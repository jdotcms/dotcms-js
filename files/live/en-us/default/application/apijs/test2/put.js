(

    const https = require('https')

    function put(context) {
    
    
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

    var str = '';
    https.get('https://rickandmortyapi.com/api/character/298', function(response) {
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                dotlogger.info(str);
            });
        });

    
    



    response.headers().append('content-type','application/json');
    return response.status(200).json(robotMorty);
})