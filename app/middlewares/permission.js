// import _ from 'lodash'

// middleware for doing role-based permissions
const permit = (/* ...allowed */) => (req, res, next) => {
  // Bypass por ahora
  next();
  // if (req.user && req.user.permisos && isAllowed(req.user.permisos))
  //   next() // role is allowed, so continue on the next middleware
  // else {
  //   res.status(403).json({ error: true, data: { message: 'Forbidden' } })
  // }
};

export default permit;
