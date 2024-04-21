import Checkit from 'checkit';
import { Model, Collection } from './model.js';
import validate from './validations.js';
import {
  upload, deleteFiles, deleteFile, errorHandling,
} from './_helpers.js';

/**
 * Obtener imágenes.
 * @param {integer} req.params.id - ID de imagen (opcional).
 * @return {json} Imagen(es). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  const id = (typeof req.params.id === 'undefined' || Number.isNaN(req.params.id)) ? 0 : Number.parseInt(req.params.id, 10);
  try {
    if (id !== 0) {
      const entity = await new Model({ IDEN_IMAGEN: id }).fetch();
      if (!entity) {
        res.status(404).json({ error: true, data: { message: 'Entity not found' } });
      } else {
        res.json({ error: false, data: entity.toJSON() });
      }
    } else {
      const entities = await new Collection().fetch();
      res.json({ error: false, data: entities.toJSON() });
    }
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};

/**
 * Agregar nueva imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen.
 * @return {json} Comentario. En caso fallido, mensaje de error.
 */
export const POST = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: true, data: err });
      return;
    }

    try {
      const { IDEN_PUBLICACION, IDEN_EMPRENDEDOR } = req.body;
      const model = new Model({
        IDEN_PUBLICACION: IDEN_PUBLICACION ? Number.parseInt(IDEN_PUBLICACION, 10) : undefined,
        IDEN_EMPRENDEDOR: IDEN_EMPRENDEDOR ? Number.parseInt(IDEN_EMPRENDEDOR, 10) : undefined,
      });

      await validate(model);

      const hasAvatar = req.files.avatar && req.files.avatar.length > 0;
      const hasGallery = req.files.gallery && req.files.gallery.length > 0;

      if (!IDEN_PUBLICACION && !IDEN_EMPRENDEDOR) {
        throw new Error('IDEN_EMPRENDEDOR or IDEN_PUBLICACION is required');
      } else if (IDEN_EMPRENDEDOR && !hasAvatar) {
        throw new Error('avatar is required for IDEN_EMPRENDEDOR');
      } else if (!IDEN_EMPRENDEDOR && hasAvatar) {
        throw new Error('IDEN_EMPRENDEDOR is required for avatar uploading');
      } else if (IDEN_PUBLICACION && !hasGallery) {
        throw new Error('gallery is required for IDEN_PUBLICACION');
      } else if (!IDEN_PUBLICACION && hasGallery) {
        throw new Error('IDEN_PUBLICACION is required for gallery uploading');
      }

      const tempModelAttributes = [];

      if (hasAvatar) {
        req.files.avatar.forEach((file) => {
          tempModelAttributes.push({
            IDEN_EMPRENDEDOR: Number.parseInt(IDEN_EMPRENDEDOR, 10),
            URL_IMAGEN: file.destination + file.filename,
          });
        });
      } else if (hasGallery) {
        req.files.gallery.forEach((file) => {
          tempModelAttributes.push({
            IDEN_PUBLICACION: Number.parseInt(IDEN_PUBLICACION, 10),
            URL_IMAGEN: file.destination + file.filename,
          });
        });
      }

      const collection = Collection.forge(tempModelAttributes);
      const entities = await collection.invokeThen('save');

      res.json({ error: false, data: entities });
    } catch (errDb) {
      deleteFiles(req.files);

      if (errorHandling.EmprendedorUniqueConstraintError(errDb)) {
        res.status(400).json({ error: true, data: { message: 'IDEN_EMPRENDEDOR already has avatar' } });
      } else {
        res.status(500).json({ error: true, data: { message: 'Internal error' } });
      }
    }
  });
};

/**
 * Actualiza una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @param {integer} req.body.IDEN_PUBLICACION - ID de Publicación a la que corresponde esta imagen (opcional).
 * @param {integer} req.body.IDEN_EMPRENDEDOR - ID de Emprendedor al que corresponde esta imagen (opcional).
 * @param {string} req.body.URL_IMAGEN - URL de la imagen (opcional).
 * @return {json} Mensaje de éxito o error.
 */
export const PUT = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ error: true, data: err });
    } else {
      try {
        const entity = await new Model({ IDEN_IMAGEN: req.params.id }).fetch({ require: true });
        deleteFile(entity.attributes.URL_IMAGEN);
        let newUrl = entity.get('URL_IMAGEN');
        if (req.files.avatar) {
          newUrl = req.files.avatar[0].destination + req.files.avatar[0].filename;
        } else if (req.files.gallery) {
          newUrl = req.files.gallery[0].destination + req.files.gallery[0].filename;
        }
        await entity.save({ URL_IMAGEN: newUrl });
        res.json({ error: false, data: { message: 'Entity successfully updated' } });
      } catch (dbErr) {
        deleteFile(req.body.URL_IMAGEN);
        if (dbErr instanceof Checkit.Error) {
          res.status(400).json({ error: true, data: err });
        } else if (dbErr instanceof Model.NotFoundError) {
          res.status(404).json({ error: true, data: { message: 'Entity not found' } });
        }
        res.status(500).json({ error: true, data: { message: 'Internal error' } });
      }
    }
  });
};

/**
 * Elimina una imagen.
 * @param {integer} req.params.id - ID de la imagen.
 * @return {json} Mensaje de éxito o error.
 */
export const DELETE = async (req, res) => {
  try {
    const entity = await new Model({ IDEN_IMAGEN: req.params.id }).fetch({ require: true });
    deleteFile(entity.attributes.URL_IMAGEN);

    await new Model({ IDEN_IMAGEN: req.params.id }).destroy({ require: true });

    res.json({ error: false, data: { message: 'Entity successfully deleted' } });
  } catch (err) {
    if (err instanceof Model.NotFoundError || err instanceof Model.NoRowsDeletedError) {
      res.status(404).json({ error: true, data: { message: 'Entity not found' } });
    } else {
      res.status(500).json({ error: true, data: { message: 'Internal error' } });
    }
  }
};
