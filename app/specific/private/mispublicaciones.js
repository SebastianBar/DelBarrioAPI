import { Model } from '../../models/publicacion/model'

/**
 * Obtener publicaciones.
 * @param {number} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  new Model().where('IDEN_EMPRENDEDOR', req.body.IDEN_EMPRENDEDOR).orderBy('IDEN_PUBLICACION').fetchAll({withRelated: ['categoria', 'oferta', 'calificaciones', {'imagenes': query => {
    query.orderBy('IDEN_IMAGEN')
  }}
  ]})
    .then(entities => {
      let jsonEntities = entities.toJSON()
      res.json({error: false, data: jsonEntities})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET
}
