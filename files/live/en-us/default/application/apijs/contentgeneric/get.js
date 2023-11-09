(async function get(context) {

    let {NotFoundError} = await import('//api-site/application/modules/not-found-error.mjs');
    const request = context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;

    const identifier = request.getParameter('id');
    const lang = request.getParameter('lang') || languagewebapi.getDefaultLanguage().getId();

    dotlogger.info("identifier = " + identifier);
    dotlogger.info("lang = " + lang);


    function mapToJson(contentlet) {
        const blockEditorBody = contentlet.get('body');
        const blockEditorJson = blockEditorBody.getJson();
        const webPageContentType = dotcontent.loadType('webPageContent');

        return {
            "identifier": contentlet.get('identifier'),
            "title": contentlet.get('title'),
            "body": blockEditorJson ? JSON.parse(blockEditorJson.toString()) : blockEditorBody.toHtml(),
            "fields":webPageContentType.fieldMap()
        }
    }

    function findById(id) {

        const cacheContentlet = dotcache.get(id);
        if (!cacheContentlet) {

            const contentlet = dotcontent.find(id);
            dotlogger.info("The contentlet = " + contentlet);
            if (null == contentlet) {

                dotlogger.info("Throwing NotFoundError");
                throw new NotFoundError(`Contentlet ${id} not found`);
            }

            const contentletJson = mapToJson(contentlet);
            dotcache.put (id, contentletJson);

            dotlogger.info("The id = " + id + " has been put on the cache");

            return contentletJson;
        }

        dotlogger.info("The id = " + id + " has found on the cache");
        return cacheContentlet;
    }

    function findAll () {

        return dotcontent.pull('+contentType:webPageContent',20,'modDate desc')
            .map((contentlet) => {

               return mapToJson(contentlet)
            });
    }


    try {
        const result = identifier ? findById(identifier) : findAll();

        return response.ok().json(result);
        //return response.status(200).json(result);
    } catch (err) {

        dotlogger.info("Error on getting contentlet" + err);
        if (err instanceof NotFoundError) {
            //return response.status(404).text(`Contentlet ${id} not found`);
            dotlogger.info("Contentlet not found 404");
            return response.status(404).text(`Contentlet ${identifier} not found`);
        }

        return response.status(500).text(`Error on getting contentlet` + err);
    }
})
