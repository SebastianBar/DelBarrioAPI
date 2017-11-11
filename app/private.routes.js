import routesInicio from './_inicio/routes'
import routesAuth from './auth/private.routes'

// Rutas privadas -> Auth
const routes = [
  routesInicio,
  routesAuth
]

export default routes
