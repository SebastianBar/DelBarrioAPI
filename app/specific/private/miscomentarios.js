import { Model as PublicacionModel } from '../../models/publicacion/model.js';

/**
 * Obtener publicaciones.
 * @param {number} req.params.id - ID de publicación (opcional).
 * @return {json} Publicación(es). En caso fallido, mensaje de error.
 */
export const GET = async (req, res) => {
  try {
    const entities = await new PublicacionModel().where('IDEN_EMPRENDEDOR', req.body.IDEN_EMPRENDEDOR).orderBy('IDEN_PUBLICACION').fetchAll({ withRelated: ['comentarios.respuesta'] });
    const jsonEntities = entities.toJSON();
    const jsonComments = [];
    jsonEntities.forEach((jsonEntity) => {
      jsonEntity.comentarios.forEach((comment) => {
        if (!Object.keys(comment.respuesta).length) jsonComments.push(comment);
      });
    });
    res.json({ error: false, data: jsonComments });
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } });
  }
};
