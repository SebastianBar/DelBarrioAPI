import { Model } from '../models/usuario/model'

const injection = {
  /**
   * Inyectar el atributo IDEN_USUARIO del usuario autenticado al payload entrante
   */
  IDEN_USUARIO: () => {
    return (req, res, next) => {
      if (req.user) {
        req.body.IDEN_USUARIO = req.user.IDEN_USUARIO
      }
      next()
    }
  },
  IDEN_EMPRENDEDOR: () => {
    return (req, res, next) => {
      if (req.user && req.user.rol.CODI_ROL === 102) {
        return new Model({IDEN_USUARIO: req.user.IDEN_USUARIO}).fetch({withRelated: ['emprendedor']})
          .then(entity => {
            req.body.IDEN_EMPRENDEDOR = entity.relations.emprendedor.attributes.IDEN_EMPRENDEDOR
            next()
          })
      } else {
        next()
      }
    }
  }
}

export default injection
