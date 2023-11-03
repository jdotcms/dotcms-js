(function get(context) {

    const request = context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;

    console.log("Calling fetch", "https://jsonplaceholder.typicode.com/posts/1");



    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => {
            response.json(res.json());
        }).catch(error => {
        console.log("fetchResponse.error() 2", error);
    });
})
