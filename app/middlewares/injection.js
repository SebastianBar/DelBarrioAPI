import { Model as UsuarioModel } from '../models/usuario/model.js';

const injection = {
  /**
   * Inyectar el atributo IDEN_USUARIO del usuario autenticado al payload entrante
   */
  IDEN_USUARIO: () => (req) => {
    if (req.user) {
      req.body.IDEN_USUARIO = req.user.IDEN_USUARIO;
    }
  },
  IDEN_EMPRENDEDOR: () => async (req, res, next) => {
    if (req.user && req.user.rol.CODI_ROL === 102) {
      const entity = await new UsuarioModel({ IDEN_USUARIO: req.user.IDEN_USUARIO }).fetch({ withRelated: ['emprendedor'] });
      req.body.IDEN_EMPRENDEDOR = entity.relations.emprendedor.attributes.IDEN_EMPRENDEDOR;
      next();
    } else {
      next();
    }
  },
};

export default injection;
