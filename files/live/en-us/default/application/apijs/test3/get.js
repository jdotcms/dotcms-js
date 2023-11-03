
(async function get(context) {

    const dotlogger = context.dotlogger;
    let {Test} = await import('/application/modules/test.mjs');
    let squareResult = new Test(1,1 ).square(5);
    dotlogger.info('Square of 5: ' + squareResult);

   /* let undef = await import('/javascript/modules/esModule.mjs');

    dotlogger.info("Test3: " + undef.default(undefined));

    let {hello} = await import('/javascript/modules/a.mjs');

    dotlogger.info("Test4: " + hello);*/

 //let Test =  import('/javascript/modules/test.mjs');
    let name = 'Jonathan';
    //let test = new Test();

    //  dotlogger.info("test.square = " + test.square(5));


    const response = context.response;
    return response.status(200).json(` This is get test <b>${name}</b> square: ${squareResult} `);
})

