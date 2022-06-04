import { Model, Collection } from './model'
import { Model as Tag } from '../etiqueta/model'
import Checkit from 'checkit'
import _ from 'lodash'

/**
 * Obtener publicaciones.
 * @param {number} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_PUBLICACION: id }).fetch({
        withRelated: [
          'emprendedor',
          'emprendedor.rubro',
          'emprendedor.usuario.telefonos',
          'etiquetas',
          'categoria',
          'imagenes',
          'oferta',
          {
            'calificaciones': query => {
              query.orderBy('IDEN_CALIFICACION', 'desc')
            }
          },
          {
            'comentarios': query => {
              query.orderBy('IDEN_COMENTARIO', 'desc')
            }
          },
          'comentarios.respuesta']
      })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        let jsonEntity = entity.toJSON()
        jsonEntity.NUMR_CALIFICACION = jsonEntity.calificaciones.length >= 5 ? _.meanBy(jsonEntity.calificaciones, e => { return e.NUMR_VALOR }) : 0
        res.json({ error: false, data: jsonEntity })
        // Incrementar contador
        const entityCounter = await new Model({ IDEN_PUBLICACION: entity.attributes.IDEN_PUBLICACION }).fetch({ require: true, withColums: ['IDEN_PUBLICACION'] })
        await entityCounter.save({ NUMR_CONTADOR: entity.get('NUMR_CONTADOR') + 1 })
      }
    } else {
      const entities = await GETAllHelper(req.query.ids, req.query.page)
      let jsonEntities = entities.toJSON()
      jsonEntities.forEach(jsonEntity => {
        jsonEntity.NUMR_CALIFICACION = jsonEntity.calificaciones.length >= 5 ? _.meanBy(jsonEntity.calificaciones, e => { return e.NUMR_VALOR }) : 0
        delete jsonEntity.calificaciones
      })
      res.json({ error: false, data: jsonEntities, pagination: entities.pagination })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Retorna instancia de colección
 * @param {number[]} ids Arreglo con ID's de publicación (opcional)
 * @param {number} page Número de página a obtener (opcional)
 */
const GETAllHelper = (ids, page = 1) => {
  if (ids) {
    return new Model().query(q => { q.where('IDEN_PUBLICACION', 'in', ids) }).orderBy('IDEN_PUBLICACION', 'desc').fetchPage({
      page: page, pageSize: 18, withRelated: ['categoria', 'oferta', 'calificaciones', {
        'imagenes': query => {
          query.orderBy('IDEN_IMAGEN')
        }
      }
      ]
    })
  }

  return new Collection().orderBy('IDEN_PUBLICACION').fetchPage({
    page: page, pageSize: 18, withRelated: ['categoria', 'oferta', 'calificaciones', {
      'imagenes': query => {
        query.orderBy('IDEN_IMAGEN')
      }
    }
    ]
  })
}

/**
 * Agregar nueva publicación.
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta publicación.
 * @param {integer} req.body.IDEN_CATEGORIA - ID de Categoría a la que corresponde esta publicación.
 * @param {char} req.body.CODI_TIPO_PUBLICACION - Define si la publicación es un (P)roducto o (S)ervicio.
 * @param {string} req.body.NOMB_PUBLICACION - Título de la publicación.
 * @param {string} req.body.DESC_PUBLICACION - Texto descriptivo de la publicación.
 * @param {integer} req.body.NUMR_PRECIO - Precio de publicación.
 * @param {integer} req.body.NUMR_CONTADOR - Contador de visitas de publicación (opcional, por defecto 0).
 * @param {boolean} req.body.FLAG_CONTENIDO_ADULTO - Define si la publicación posee contenido adulto (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la publicación está activa (opcional, por defecto true).
 * @param {boolean} req.body.FLAG_VALIDADO - Define si la publicación ha sido aprobada por un administrador (opcional, por defecto false).
 * @param {boolean} req.body.FLAG_BAN - Define si la publicación está baneada (opcional, por defecto false).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la publicación (opcional, por defecto now()).
 * @param {array} req.body.ETIQUETAS - Arreglo de strings que conformarán las etiquetas de la publicación (opcional).
 * @return {json} Publicación. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_EMPRENDEDOR: req.body.IDEN_EMPRENDEDOR,
      IDEN_CATEGORIA: req.body.IDEN_CATEGORIA,
      CODI_TIPO_PUBLICACION: req.body.CODI_TIPO_PUBLICACION,
      NOMB_PUBLICACION: req.body.NOMB_PUBLICACION,
      DESC_PUBLICACION: req.body.DESC_PUBLICACION,
      NUMR_PRECIO: req.body.NUMR_PRECIO,
      NUMR_CONTADOR: req.body.NUMR_CONTADOR,
      FLAG_CONTENIDO_ADULTO: req.body.FLAG_CONTENIDO_ADULTO,
      FLAG_VIGENTE: req.body.FLAG_VIGENTE,
      FLAG_VALIDADO: req.body.FLAG_VALIDADO,
      FLAG_BAN: req.body.FLAG_BAN,
      FECH_CREACION: req.body.FECH_CREACION
    }).save()
    if (req.body.ETIQUETAS && Array.isArray(req.body.ETIQUETAS)) {
      const tagIDs = await obtainTagIDs(req.body.ETIQUETAS)
      await entity.etiquetas().attach(tagIDs)
      res.json({ error: false, data: entity.toJSON() })
    } else {
      res.json({ error: false, data: entity.toJSON() })
    }
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Actualiza una publicación.
 * @param {integer} req.params.id - ID de la publicación.
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta publicación (opcional).
 * @param {integer} req.body.IDEN_CATEGORIA - ID de Categoría a la que corresponde esta publicación (opcional).
 * @param {char} req.body.CODI_TIPO_PUBLICACION - Define si la publicación es un (P)roducto o (S)ervicio (opcional).
 * @param {string} req.body.NOMB_PUBLICACION - Título de la publicación (opcional).
 * @param {string} req.body.DESC_PUBLICACION - Texto descriptivo de la publicación (opcional).
 * @param {integer} req.body.NUMR_PRECIO - Precio de publicación (opcional).
 * @param {integer} req.body.NUMR_CONTADOR - Contador de visitas de publicación (opcional).
 * @param {boolean} req.body.FLAG_CONTENIDO_ADULTO - Define si la publicación posee contenido adulto (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la publicación está activa (opcional).
 * @param {boolean} req.body.FLAG_VALIDADO - Define si la publicación ha sido aprobada por un administrador (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si la publicación está baneada (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación de la publicación (opcional).
 * @param {array} req.body.ETIQUETAS - Arreglo de strings que conformarán las etiquetas de la publicación (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_PUBLICACION: req.params.id }).fetch({ require: true, withRelated: ['etiquetas'] })
    await entity.save({
      IDEN_EMPRENDEDOR: (typeof req.body.IDEN_EMPRENDEDOR === 'undefined') ? entity.get('IDEN_EMPRENDEDOR') : req.body.IDEN_EMPRENDEDOR,
      IDEN_CATEGORIA: (typeof req.body.IDEN_CATEGORIA === 'undefined') ? entity.get('IDEN_CATEGORIA') : req.body.IDEN_CATEGORIA,
      CODI_TIPO_PUBLICACION: (typeof req.body.CODI_TIPO_PUBLICACION === 'undefined') ? entity.get('CODI_TIPO_PUBLICACION') : req.body.CODI_TIPO_PUBLICACION,
      NOMB_PUBLICACION: (typeof req.body.NOMB_PUBLICACION === 'undefined') ? entity.get('NOMB_PUBLICACION') : req.body.NOMB_PUBLICACION,
      DESC_PUBLICACION: (typeof req.body.DESC_PUBLICACION === 'undefined') ? entity.get('DESC_PUBLICACION') : req.body.DESC_PUBLICACION,
      NUMR_PRECIO: (typeof req.body.NUMR_PRECIO === 'undefined') ? entity.get('NUMR_PRECIO') : req.body.NUMR_PRECIO,
      NUMR_CONTADOR: (typeof req.body.NUMR_CONTADOR === 'undefined') ? entity.get('NUMR_CONTADOR') : req.body.NUMR_CONTADOR,
      FLAG_CONTENIDO_ADULTO: (typeof req.body.FLAG_CONTENIDO_ADULTO === 'undefined') ? entity.get('FLAG_CONTENIDO_ADULTO') : req.body.FLAG_CONTENIDO_ADULTO,
      FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE,
      FLAG_VALIDADO: (typeof req.body.FLAG_VALIDADO === 'undefined') ? entity.get('FLAG_VALIDADO') : req.body.FLAG_VALIDADO,
      FLAG_BAN: (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN,
      FECH_CREACION: (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
    })
    if (req.body.ETIQUETAS && Array.isArray(req.body.ETIQUETAS)) {
      const tagIDs = await obtainTagIDs(req.body.ETIQUETAS)
      const attach = _.difference(tagIDs, entity.relations.etiquetas.pluck('IDEN_ETIQUETA'))
      const detach = _.difference(entity.relations.etiquetas.pluck('IDEN_ETIQUETA'), tagIDs)
      await entity.etiquetas().attach(attach)
      await entity.etiquetas().detach(detach)
      res.json({ error: false, data: { message: 'Entity successfully updated' } })
    } else {
      res.json({ error: false, data: { message: 'Entity successfully updated' } })
    }
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err })
    } else if (err instanceof Model.NotFoundError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Elimina una publicación.
 * @param {integer} req.params.id - ID de la publicación.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_PUBLICACION: req.params.id }).destroy({ require: true })
    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  } catch (err) {
    if (err instanceof Model.NotFoundError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Busca ID's de Tags. En caso de no encontrar un tag, lo agregará y retornará su nuevo ID
 * @param {*} tags Arreglo de tags a buscar
 */
const obtainTagIDs = async tags => {
  let ids = []

  tags.forEach(async tag => {
    const entity = await new Tag().where('NOMB_ETIQUETA', tag).fetch()
    if (!entity) {
      const newEntity = await new Tag({ NOMB_ETIQUETA: tag }).save()
      ids.push(newEntity.attributes.IDEN_ETIQUETA)
    } else {
      ids.push(entity.attributes.IDEN_ETIQUETA)
    }
  })

  return ids
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
