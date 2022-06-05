import routesInicio from './_inicio/routes.js';
import routesAuth from './auth/public.routes.js';
import routesRubro from './models/rubro/public.routes.js';
import routesEmprendedor from './models/emprendedor/public.routes.js';
import routesCategoria from './models/categoria/public.routes.js';
import routesPersona from './models/persona/public.routes.js';
import routesFaq from './models/faq/public.routes.js';
import routesPublicacion from './models/publicacion/public.routes.js';
import routesOferta from './models/oferta/public.routes.js';
import routesImagen from './models/imagen/public.routes.js';
import routesUsuario from './models/usuario/public.routes.js';
import routesMotivoDenuncia from './models/motivo_denuncia/public.routes.js';

import specificRoutes from './specific/public.routes.js';

/*
* Todas las rutas públicas para desarrollo
*/
const routes = [
  routesInicio,
  routesAuth,
  routesRubro,
  routesEmprendedor,
  routesCategoria,
  routesPersona,
  routesFaq,
  routesPublicacion,
  routesOferta,
  routesImagen,
  specificRoutes,
  routesUsuario,
  routesMotivoDenuncia,
];

export default routes;
