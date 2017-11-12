import routesInicio from './_inicio/routes'
import routesAuth from './auth/public.routes'
import routesRol from './models/rol/routes'
import routesPermiso from './models/permiso/routes'
import routesUsuario from './models/usuario/routes'
import routesTelefono from './models/telefono/routes'
import routesRubro from './models/rubro/routes'
import routesEmprendedor from './models/emprendedor/routes'
import routesCategoria from './models/categoria/routes'
import routesPersona from './models/persona/routes'
import routesFaq from './models/faq/routes'
import routesMotivoDeshabilitacion from './models/motivo_deshabilitacion/routes'
import routesMotivoDenuncia from './models/motivo_denuncia/routes'
import routesTipoPublicacion from './models/tipo_publicacion/routes'
import routesPublicacion from './models/publicacion/routes'
import routesOferta from './models/oferta/routes'

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
  routesFaq,
  routesMotivoDeshabilitacion,
  routesMotivoDenuncia,
  routesTipoPublicacion,
  routesPublicacion,
  routesOferta
]

export default routes
