import routesInicio from './_inicio/routes.js';
import routesAuth from './auth/private.routes.js';
import routesCalificacion from './models/calificacion/private.routes.js';
import routesCategoria from './models/categoria/private.routes.js';
import routesComentario from './models/comentario/private.routes.js';
import routesEmprendedor from './models/emprendedor/private.routes.js';
import routesFaq from './models/faq/private.routes.js';
import routesImagen from './models/imagen/private.routes.js';
import routesMotivoDenuncia from './models/motivo_denuncia/private.routes.js';
import routesMotivoDeshabilitacion from './models/motivo_deshabilitacion/private.routes.js';
import routesOferta from './models/oferta/private.routes.js';
import routesPersona from './models/persona/private.routes.js';
import routesPublicacion from './models/publicacion/private.routes.js';
import routesRespuesta from './models/respuesta/private.routes.js';
import routesRubro from './models/rubro/private.routes.js';
import routesTelefono from './models/telefono/private.routes.js';
import routesUsuario from './models/usuario/private.routes.js';
import routesTerminosCondiciones from './models/terminos_condiciones/private.routes.js';
import routesDenuncia from './models/denuncia/private.routes.js';
import routesResolucionDenuncia from './models/resolucion_denuncia/private.routes.js';

import specificRoutes from './specific/private.routes.js';

const routes = [
  routesInicio,
  routesAuth,
  routesCalificacion,
  routesCategoria,
  routesComentario,
  routesEmprendedor,
  routesFaq,
  routesImagen,
  routesMotivoDenuncia,
  routesMotivoDeshabilitacion,
  routesOferta,
  routesPersona,
  routesPublicacion,
  routesRespuesta,
  routesRubro,
  routesTelefono,
  routesUsuario,
  routesTerminosCondiciones,
  routesDenuncia,
  routesResolucionDenuncia,
  specificRoutes,
];

export default routes;
