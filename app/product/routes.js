const express = require('express')

const app = express.Router()

// router.get('/direccion', async (req, res, next) => {
//     //res.send({ 'Mensaje': 'API REST v1' })
    
//     res.status(200).send({txt: 'METODO GET'}) 
// })

// app.route('/direccion')
//     .get(function(req, res, next) {
//         res.send({ 'Mensaje': 'API REST v1' })  
//     })

// app.route('/direccion')
//     .get( (req,res) => {
//         res.json({ message: 'Funciona! Bienvenido a la api!' }); 
//     })

    app.get( '/direccion', (req,res) => {
        res.json({ message: 'GET: Direccion' }); 
    })

export default app



// const Ctrl 		= require('./controller');
// exports.routeProduct = function(req, res) {

//     const router = express.Router()

// 	//Products
//     router.route('/product/:id')
//         .get(
//             res.send({ 'Mensaje': 'API REST v1' }) 
//             );
    
//         // .get 	(Ctrl.listProduct)
//         // .post 	(Ctrl.createProduct)
//         // .patch 	(Ctrl.updateProduct)
//         // // .put (Ctrl.deleteProduct)  //NO se usa poraue camboa la estructura de la Tabla-Collections
//         // .delete (Ctrl.deleteProduct)

        


//     };

    