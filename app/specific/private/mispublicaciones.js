import { Model as PublicacionModel } from '../../models/publicacion/model.js';

/**
 * Obtener publicaciones.
 * @param {number} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  try {
    const entities = await new PublicacionModel().where('IDEN_EMPRENDEDOR', req.body.IDEN_EMPRENDEDOR).orderBy('IDEN_PUBLICACION').fetchAll({
      withRelated: ['categoria', 'oferta', 'calificaciones', {
        imagenes: (query) => {
          query.orderBy('IDEN_IMAGEN');
        },
      }],
    });
    const jsonEntities = entities.toJSON();
    res.json({ error: false, data: jsonEntities });
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};
