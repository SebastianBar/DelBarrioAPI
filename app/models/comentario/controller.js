import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener comentarios.
 * @param {integer} req.params.id - ID de comentario (opcional).
 * @return {json} Comentario(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_COMENTARIO: id }).fetch()
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch()
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nuevo comentario.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde este comentario.
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor del comentario.
 * @param {string} req.body.DESC_COMENTARIO - Comentario.
 * @param {boolean} req.body.FLAG_BAN - Define si el comentario está baneado (opcional, por defecto false).
 * @param {date} req.body.FECH_CREACION - Fecha de creación del comentario (opcional, por defecto now()).
 * @return {json} Comentario. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_PUBLICACION: req.body.IDEN_PUBLICACION,
      IDEN_USUARIO: req.body.IDEN_USUARIO,
      DESC_COMENTARIO: req.body.DESC_COMENTARIO,
      FLAG_BAN: req.body.FLAG_BAN,
      FECH_CREACION: req.body.FECH_CREACION
    }).save()

    res.json({ error: false, data: entity.toJSON() })
  } catch (err) {
    if (err instanceof Checkit.Error) {
      res.status(400).json({ error: true, data: err })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/**
 * Actualiza un comentario.
 * @param {integer} req.params.id - ID del comentario.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde este comentario (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de Usuario emisor del comentario (opcional).
 * @param {string} req.body.DESC_COMENTARIO - Comentario (opcional).
 * @param {boolean} req.body.FLAG_BAN - Define si el comentario está baneado (opcional).
 * @param {date} req.body.FECH_CREACION - Fecha de creación del comentario (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_COMENTARIO: req.params.id }).fetch({ require: true })
    await entity.save({
      IDEN_PUBLICACION: (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
      DESC_COMENTARIO: (typeof req.body.DESC_COMENTARIO === 'undefined') ? entity.get('DESC_COMENTARIO') : req.body.DESC_COMENTARIO,
      FLAG_BAN: (typeof req.body.FLAG_BAN === 'undefined') ? entity.get('FLAG_BAN') : req.body.FLAG_BAN,
      FECH_CREACION: (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION
    })

    res.json({ error: false, data: { message: 'Entity successfully updated' } })
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
 * Elimina un comentario.
 * @param {integer} req.params.id - ID del comentario.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_COMENTARIO: req.params.id }).destroy({ require: true })
    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    }
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
