(function get(context) {

    const request = context.request;
    const response = context.response;
    const dotlogger = context.dotlogger;

    const identifier = request.getParameter('id');
    const lang = request.getParameter('lang') || languagewebapi.getDefaultLanguage().getId();

    dotlogger.info("identifier = " + identifier);
    dotlogger.info("lang = " + lang);

    class NotFoundError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

    function mapToJson(contentlet) {
        const blockEditorBody = contentlet.get('body');
        const blockEditorJson = blockEditorBody.getJson();
        return {
            "identifier": contentlet.get('identifier'),
            "title": contentlet.get('title'),
            "body": blockEditorJson ? JSON.parse(blockEditorJson.toString()) : blockEditorBody.toHtml()
        }
    }

    function findById(id) {

        const cacheContentlet = dotcache.get(id);
        if (!cacheContentlet) {

            const contentlet = dotcontent.load(id);
            if (null == contentlet) {

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

        return response.status(200).json(result);
    } catch (err) {

        if (err instanceof NotFoundError) {
            return response.status(404).text(`Contentlet ${id} not found`);
        }
        return response.status(500).text(`Error on getting contentlet` + err);
    }
})
