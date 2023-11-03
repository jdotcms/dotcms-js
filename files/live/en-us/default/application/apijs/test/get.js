
(function get(context) {

    const dotlogger = context.dotlogger;
    let test = import('/javascript/modules/test.mjs');

    test.then(({Test}) => {

        dotlogger.info('Funcionoxxx' + new Test(1,1 ).square(5));

    }).catch((error) => {

            dotlogger.info("Test1: " + error);
    });
    import('/javascript/modules/esModule.mjs').then((undef) => {

        dotlogger.info("Test3: " + undef.default(undefined));

    });

    import('/javascript/modules/a.mjs').then(({hello}) => {

        dotlogger.info("Test4: " + hello);

    }).catch((error) => {

        dotlogger.info("Test4: " + error);
    });;

 //let Test =  import('/javascript/modules/test.mjs');
    let name = 'Jonathan';
    //let test = new Test();

    //  dotlogger.info("test.square = " + test.square(5));


    return ` This is get test <b>${name}</b> `;
})

