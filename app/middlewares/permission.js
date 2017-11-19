import _ from 'lodash'

// middleware for doing role-based permissions
function permit (...allowed) {
  const isAllowed = permisos => _.intersection(_.map(permisos, 'CODI_PERMISO'), allowed).length > 0

  // return a middleware
  return (req, res, next) => {
    if (req.user && req.user.rol && req.user.rol.permisos && isAllowed(req.user.rol.permisos))
      next() // role is allowed, so continue on the next middleware
    else {
      res.status(403).json({ error: true, data: { message: 'Forbidden' } }) // user is forbidden
    }
  }
}

export default permit
