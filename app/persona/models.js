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
import db from '../connection'


const listaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined" || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
    let sql = `select per_id, per_rut,per_dv,per_nombre,per_apepat,per_apemat,per_estado 
                from empr_personas 
                where per_estado = 1 `

    _id != 0 ? sql = sql + ` and per_id = ${_id}` : ''

    db.query(sql)
            .then(res => { return res.rows })
            .catch(e  => console.error(e.stack) )

    .then( (x)=> { return res.json(x) })  
                
  } catch (e) { res.status(200).send({error: e.toString()})  }  //throw new Error(e)  
  
}





const insertaDatos = (req,res)=> { 
  try {
    const _id = (typeof req.params.id === "undefined") ? 0 : parseInt(req.params.id)
    console.log('_id: ', _id)

    return res.json( [{  message: 'POST: Inserta una Persona'  }])
    

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


