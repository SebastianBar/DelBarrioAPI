import routesInicio from './_inicio/routes'
import routesAuth from './auth/routes'
import routesRol from './models/rol/routes'
import routesPermiso from './models/permiso/routes'
import routesUsuario from './models/usuario/routes'
import routesTelefono from './models/telefono/routes'
import routesRubro from './models/rubro/routes'
import routesEmprendedor from './models/emprendedor/routes'
import routesCategoria from './models/categoria/routes'
import routesPersona from './models/persona/routes'
import routesFaq from './models/faq/routes'

/*
* Todas las rutas públicas para desarrollo
*/
const routes = [
  routesInicio,
  routesAuth,
  routesRol,
  routesPermiso,
  routesUsuario,
  routesTelefono,
  routesRubro,
  routesEmprendedor,
  routesCategoria,
  routesPersona,
  routesFaq
]

export default routes
