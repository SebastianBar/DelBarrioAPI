const express = require('express')
const app = express.Router()


    // app.get( '/', (req,res) => {
    //     res.json({ message: 'GET: BIENVENIDO' }); 
    // })
    app.all( '/', (req,res) => {
        res.json({ message: 'GET: BIENVENIDO' }); 
    })

    // app.all('/secret', function (req, res, next) {
    //     console.log('Accessing the secret section ...');
    //     next(); // pass control to the next handler
    //   });

export default app


