import routesInicio from './_inicio/routes'
import routesRol from './models/rol/routes'
import routesPermiso from './models/permiso/routes'
import routesUsuario from './models/usuario/routes'
import routesTelefono from './models/telefono/routes'
import routesRubro from './models/rubro/routes'
import routesEmprendedor from './models/emprendedor/routes'

/*
* Todas las rutas públicas para desarrollo
*/
const routes = [
    routesInicio,
    routesRol,
    routesPermiso,
    routesUsuario,
    routesTelefono,
    routesRubro,
    routesEmprendedor
]

export default routes
