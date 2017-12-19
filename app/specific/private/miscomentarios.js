import { Model } from '../../models/publicacion/model'
import _ from 'lodash'

/**
 * Obtener publicaciones.
 * @param {number} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  new Model().where('IDEN_EMPRENDEDOR', req.body.IDEN_EMPRENDEDOR).orderBy('IDEN_PUBLICACION').fetchAll({withRelated: ['comentarios.respuesta']})
    .then(entities => {
      let jsonEntities = entities.toJSON()
      let jsonComments = []
      jsonEntities.forEach(jsonEntity => {
        jsonEntity.comentarios.forEach(comment => {
          if(Object.keys(comment.respuesta).length === 0)
            jsonComments.push(comment)
        })
      })
      res.json({error: false, data: jsonComments})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET
}
