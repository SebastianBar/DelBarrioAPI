/*
**** METODOS HTTP UTILIZADOS **** 
* GET:      Consultar y leer recursos
* POST:     Permite crear un nuevo recurso
* PUT:      Permite editar un recurso
* DELETE:   Elimina un recurso  
* PATCH:    Permite editar partes concretas de un recurso, recibe los datos mediante x-www-form-urlencode
*/


// {
//   error : '',
//   error_description : ''
// }

'user strict'

const listaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined") ? 0 : parseInt(req.params.id)
    console.log('_id: ', _id)


   // return {  message: `GET: DATOS DE LA PERSONA ID: ${id}`  } 
    return res.json( {  message: `GET: DATOS DE LA PERSONA`  })
    

  } catch (e) { throw new Error(e) }  
  
}





const insertaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined") ? 0 : parseInt(req.params.id)
    console.log('_id: ', _id)

    return res.json( {  message: 'POST: Inserta una Persona'  })
    

  } catch (e) { throw new Error(e) }  
}

const modificaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined") ? 0 : parseInt(req.params.id)
    console.log('_id: ', _id)
    return res.json( {  message: 'PUT: Modifica una Persona'  })
    

  } catch (e) { throw new Error(e) }  
}


const eliminaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined") ? 0 : parseInt(req.params.id)
    console.log('_id: ', _id)
    return res.json( {  message: 'DELETE: Elimina una Persona'  })
    

  } catch (e) { throw new Error(e) }  
}




module.exports = { 
  getDatos    : listaDatos,
  postDatos   : insertaDatos, 
  putDatos    : modificaDatos, 
  delDatos    : eliminaDatos,
}



// module.exports = listaPersona, insertaPersona, modificaPersona, eliminaPersona

// module.exports = {
//   getPersona(id): listaPersona(id), 
//   //getAllPersona: listaPersonas(), 
//   postPersona: insertaPersona(), 
//   putPersona: modificaPersona(), 
//   deletePersona: eliminaPersona(), 
// }


//import cn from '../config'
//import { Client } from 'pg'

//const { Client } = require('pg')

// const client = new Client({
//     user: 'root',
//     host: 'localhost',
//     database: 'delbarrio',
//     password: '1234',
//     port: 5432,
//   })

// const client = new Client({
//     user: cn.postgresUser,
//     host: cn.postgresHost,
//     database: cn.postgresDb,
//     password: cn.postgresPwd,
//     port: cn.postgresPort
// })
//  client.connect()
  

// bd = require('../connection');

// bd.query('select * from empr_personas', (err, res) => {
//     console.log(err, res)
//     client.end()
//   })




// mongoose = require('../connection');
// mongoose.Promise = global.Promise
// const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;

// const   direccionSchema = new Schema ({
//         name        : {type: String},
//         picture     : {type: String},
//         price       : {type: String},
//         category    : {type: String, enum:['computer', 'phones', 'accesories'] },
//         description : {type: String}
// })

//username: { type: String,required: true, index: { unique: true, sparse: true }}

// module.exports = mongoose.model('Product', direccionSchema)

