import { Model, Collection } from './model'
import Checkit from 'checkit'

/**
 * Obtener denuncias.
 * @param {integer} req.params.id - ID de denuncia (opcional).
 * @return {json} Denuncia(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_DENUNCIA: id }).fetch({ withRelated: ['publicacion', 'calificacion', 'comentario', 'usuario', 'usuario.persona', 'usuario.emprendedor', 'motivo_denuncia', 'resolucion_denuncia', 'resolucion_denuncia.usuario', 'resolucion_denuncia.usuario.persona'] })
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } })
      } else {
        res.json({ error: false, data: entity.toJSON() })
      }
    } else {
      const entities = await new Collection().fetch({ withRelated: ['publicacion', 'calificacion', 'comentario', 'usuario', 'usuario.persona', 'usuario.emprendedor', 'motivo_denuncia', 'resolucion_denuncia', 'resolucion_denuncia.usuario', 'resolucion_denuncia.usuario.persona'] })
      res.json({ error: false, data: entities.toJSON() })
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/**
 * Agregar nueva denuncia.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación (opcional).
 * @param {integer} req.body.IDEN_CALIFICACION - ID de calificación (opcional).
 * @param {integer} req.body.IDEN_COMENTARIO - ID de comentario (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor.
 * @param {integer} req.body.IDEN_MOTIVO_DENUNCIA - ID de motivo de denuncia.
 * @param {string} req.body.DESC_DENUNCIA - Texto descriptivo de la denuncia.
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional, por defecto now()).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la denuncia está activa (opcional, por defecto true).
 * @return {json} Denuncia. En caso fallido, mensaje de error.
 */
const POST = async (req, res) => {
  try {
    const entity = await new Model({
      IDEN_PUBLICACION: req.body.IDEN_PUBLICACION,
      IDEN_CALIFICACION: req.body.IDEN_CALIFICACION,
      IDEN_COMENTARIO: req.body.IDEN_COMENTARIO,
      IDEN_USUARIO: req.body.IDEN_USUARIO,
      IDEN_MOTIVO_DENUNCIA: req.body.IDEN_MOTIVO_DENUNCIA,
      DESC_DENUNCIA: req.body.DESC_DENUNCIA,
      FECH_CREACION: req.body.FECH_CREACION,
      FLAG_VIGENTE: req.body.FLAG_VIGENTE
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
 * Actualiza una denuncia.
 * @param {integer} req.params.id - ID de denuncia.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de publicación (opcional).
 * @param {integer} req.body.IDEN_CALIFICACION - ID de calificación (opcional).
 * @param {integer} req.body.IDEN_COMENTARIO - ID de comentario (opcional).
 * @param {integer} req.body.IDEN_USUARIO - ID de usuario emisor (opcional).
 * @param {integer} req.body.IDEN_MOTIVO_DENUNCIA - ID de motivo de denuncia (opcional).
 * @param {string} req.body.DESC_DENUNCIA - Texto descriptivo de la denuncia (opcional).
 * @param {datetime} req.body.FECH_CREACION - Fecha de creación de la denuncia (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la denuncia está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_DENUNCIA: req.params.id }).fetch({ require: true })
    await entity.save({
      IDEN_PUBLICACION: (typeof req.body.IDEN_PUBLICACION === 'undefined') ? entity.get('IDEN_PUBLICACION') : req.body.IDEN_PUBLICACION,
      IDEN_CALIFICACION: (typeof req.body.IDEN_CALIFICACION === 'undefined') ? entity.get('IDEN_CALIFICACION') : req.body.IDEN_CALIFICACION,
      IDEN_COMENTARIO: (typeof req.body.IDEN_COMENTARIO === 'undefined') ? entity.get('IDEN_COMENTARIO') : req.body.IDEN_COMENTARIO,
      IDEN_USUARIO: (typeof req.body.IDEN_USUARIO === 'undefined') ? entity.get('IDEN_USUARIO') : req.body.IDEN_USUARIO,
      IDEN_MOTIVO_DENUNCIA: (typeof req.body.IDEN_MOTIVO_DENUNCIA === 'undefined') ? entity.get('IDEN_MOTIVO_DENUNCIA') : req.body.IDEN_MOTIVO_DENUNCIA,
      DESC_DENUNCIA: (typeof req.body.DESC_DENUNCIA === 'undefined') ? entity.get('DESC_DENUNCIA') : req.body.DESC_DENUNCIA,
      FECH_CREACION: (typeof req.body.FECH_CREACION === 'undefined') ? entity.get('FECH_CREACION') : req.body.FECH_CREACION,
      FLAG_VIGENTE: (typeof req.body.FLAG_VIGENTE === 'undefined') ? entity.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
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
 * Elimina una denuncia.
 * @param {integer} req.params.id - ID de denuncia.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    await new Model({ IDEN_DENUNCIA: req.params.id }).destroy({ require: true })
    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  } catch (err) {
    if (err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } })
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } })
    }
  }
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
