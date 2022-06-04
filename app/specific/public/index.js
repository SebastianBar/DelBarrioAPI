import _ from 'lodash'
import { Collection as Publicaciones } from '../../models/publicacion/model'
import { Collection as Emprendedores } from '../../models/emprendedor/model'

const GET = async (req, res) => {
  try {
    const publicaciones = await new Publicaciones().orderBy('IDEN_PUBLICACION').fetch({
      withRelated: ['categoria', 'oferta', 'calificaciones', {
        'imagenes': query => {
          query.orderBy('IDEN_IMAGEN')
        }
      }]
    })

    let pubs = publicaciones.toJSON()
    pubs.forEach(jsonEntity => {
      jsonEntity.NUMR_CALIFICACION = jsonEntity.calificaciones.length >= 5 ? _.meanBy(jsonEntity.calificaciones, e => { return e.NUMR_VALOR }) : 0
      delete jsonEntity.calificaciones
    })
    pubs = _.take((_.orderBy(pubs, ['NUMR_CALIFICACION'], ['desc'])), 12)

    const emprendedores = await new Emprendedores().fetch({ withRelated: ['usuario', 'usuario.telefonos', 'publicaciones', 'publicaciones.imagenes', 'rubro', 'imagen'] })
    const empr = _.sampleSize(emprendedores.toJSON(), 10)
    res.json({ error: false, data: { publicaciones: pubs, emprendedores: empr } })
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/* Se exportan los métodos */
module.exports = {
  GET
}
