(function get(context) {

    const request = context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;

    const identifier = request.getParameter('id');
    const lang = request.getParameter('lang') | languagewebapi.getDefaultLanguage().getId();
    dotlogger.info("identifier = " + identifier);
    dotlogger.info("lang = " + lang);

    const contentlet = dotcontent.load(identifier);
    if (null == contentlet) {

        return response.status(404).text(`Contentlet ${identifier} not found`);
    }

    let contentJson = {
        "title": contentlet.get('title'),
        "body": JSON.parse(contentlet.get('body').getJson().toString())
    };

    return response.status(200).json(contentJson);
})
