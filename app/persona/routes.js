'use strict'
import models from './models'
import express from 'express'
const app = express.Router()


    app.route('/persona/:id?')
        
        .get    ( (req,res)=> models.getDatos(req,res) )
        
        .post   ( (req,res)=> models.postDatos(req,res) )
        
        .put    ( (req,res)=> models.putDatos(req,res) )
        
        .delete ( (req,res)=> models.deleteDatos(req,res) )

    

export default app




//    app.get( '/persona', (req,res) => {
//         res.json({ message: 'GET: Persona' }); 
//     })


// app.route('/persona')
//     .get(   res.send({ 'Mensaje': 'API REST v1' })  );



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

        


    // app.get( '/persona', (req,res) => {
    //     res.json({ message: 'GET: Persona' }); 
    // })

    // app.post( '/persona', (req,res) => {
    //     res.json({ message: 'GET: Persona' }); 
    // })

    // app.post( '/persona', (req,res) => {
    //     res.json({ message: 'GET: Persona' }); 
    // })




// export default app


