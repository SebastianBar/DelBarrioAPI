import { Model, Collection } from './model'
import Checkit from 'checkit'
import validate from './validations'
import { upload, deleteFiles, deleteFile, errorHandling } from './_helpers'

/**
 * Obtener imágenes.
 * @param {integer} req.params.id - ID de imagen (opcional).
 * @return {json} Imagen(es). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || isNaN(req.params.id)) ? 0 : parseInt(req.params.id)
  try {
    if (id != 0) {
      const entity = await new Model({ IDEN_IMAGEN: id }).fetch()
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
 * Agregar nueva imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen.
 * @return {json} Comentario. En caso fallido, mensaje de error.
 */
const POST = (req, res) => {
  upload(req, res, async err => {
    if (err) {
      res.status(400).json({ error: true, data: err })
    } else {
      try {
        // Validar atributos IDEN_PUBLICACION o IDEN_EMPRENDEDOR
        const model = new Model({
          IDEN_PUBLICACION: req.body.IDEN_PUBLICACION ? parseInt(req.body.IDEN_PUBLICACION) : undefined,
          IDEN_EMPRENDEDOR: req.body.IDEN_EMPRENDEDOR ? parseInt(req.body.IDEN_EMPRENDEDOR) : undefined
        })
        await validate(model)
        if (!req.body.IDEN_PUBLICACION && !req.body.IDEN_EMPRENDEDOR) {
          deleteFiles(req.files)
          res.status(400).json({ error: true, data: { message: 'IDEN_EMPRENDEDOR or IDEN_PUBLICACION is required' } })
        }
        else if (!req.files.avatar && req.body.IDEN_EMPRENDEDOR) {
          deleteFiles(req.files)
          res.status(400).json({ error: true, data: { message: 'avatar is required for IDEN_EMPRENDEDOR' } })
        }
        else if (req.files.avatar && !req.body.IDEN_EMPRENDEDOR) {
          deleteFiles(req.files)
          res.status(400).json({ error: true, data: { message: 'IDEN_EMPRENDEDOR is required for avatar uploading' } })
        }
        else if (!req.files.gallery && req.body.IDEN_PUBLICACION) {
          deleteFiles(req.files)
          res.status(400).json({ error: true, data: { message: 'gallery is required for IDEN_PUBLICACION' } })
        }
        else if (req.files.gallery && !req.body.IDEN_PUBLICACION) {
          deleteFiles(req.files)
          res.status(400).json({ error: true, data: { message: 'IDEN_PUBLICACION is required for gallery uploading' } })
        }
        else {
          let tempModelAttributes = []
          // Todo válido, fijar persistencia de archivos
          if (req.files.avatar) {
            req.files.avatar.forEach(file => {
              tempModelAttributes.push(
                {
                  IDEN_EMPRENDEDOR: req.body.IDEN_EMPRENDEDOR ? parseInt(req.body.IDEN_EMPRENDEDOR) : undefined,
                  URL_IMAGEN: file.destination + file.filename
                }
              )
            })
          }
          else if (req.files.gallery) {
            req.files.gallery.forEach(file => {
              tempModelAttributes.push(
                {
                  IDEN_PUBLICACION: req.body.IDEN_PUBLICACION ? parseInt(req.body.IDEN_PUBLICACION) : undefined,
                  URL_IMAGEN: file.destination + file.filename
                }
              )
            })
          }
          const collection = Collection.forge(tempModelAttributes)

          const entities = await collection.invokeThen('save')
          res.status(200).json({ error: false, data: entities })
        }
      } catch (err) {
        deleteFiles(req.files)
        if (errorHandling.EmprendedorUniqueConstraintError(err)) {
          res.status(400).json({ error: true, data: { message: 'IDEN_EMPRENDEDOR already has avatar' } })
        } else {
          res.status(500).json({ error: true, data: { message: 'Internal error' } })
        }
      }
    }
  })
}

/**
 * Actualiza una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen (opcional).
 * @return {json} Mensaje de éxito o error.
 */
const PUT = (req, res) => {
  upload(req, res, async err => {
    if (err) {
      res.status(400).json({ error: true, data: err })
    } else {
      try {
        const entity = await new Model({ IDEN_IMAGEN: req.params.id }).fetch({ require: true })
        deleteFile(entity.attributes.URL_IMAGEN)
        let newUrl = entity.get('URL_IMAGEN')
        if (req.files.avatar) {
          newUrl = req.files.avatar[0].destination + req.files.avatar[0].filename
        }
        else if (req.files.gallery) {
          newUrl = req.files.gallery[0].destination + req.files.gallery[0].filename
        }
        await entity.save({ URL_IMAGEN: newUrl })
        res.json({ error: false, data: { message: 'Entity successfully updated' } })
      } catch (err) {
        deleteFile(req.body.URL_IMAGEN)
        if (err instanceof Checkit.Error) {
          res.status(400).json({ error: true, data: err })
        } else if (err instanceof Model.NotFoundError) {
          res.status(404).json({ error: true, data: { message: 'Entity not found' } })
        }
        res.status(500).json({ error: true, data: { message: 'Internal error' } })
      }

    }
  })
}

/**
 * Elimina una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @return {json} Mensaje de éxito o error.
 */
const DELETE = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_IMAGEN: req.params.id }).fetch({ require: true })
    deleteFile(entity.attributes.URL_IMAGEN)

    await new Model({ IDEN_IMAGEN: req.params.id }).destroy({ require: true })

    res.json({ error: false, data: { message: 'Entity successfully deleted' } })
  } catch (err) {
    if (err instanceof Model.NotFoundError || err instanceof Model.NoRowsDeletedError) {
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
