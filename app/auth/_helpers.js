import bcrypt from 'bcryptjs';
import omitDeep from 'omit-deep';
import _ from 'lodash';

/**
 * Comparación de una contraseña respecto a su hash.
 * @param {string} userPassword - Contraseña como texto plano.
 * @param {string} databasePassword - Contraseña como hash bcrypt.
 * @return {boolean} Define si las contraseñas coinciden.
 */
export const comparePass = (userPassword, databasePassword) => bcrypt.compareSync(userPassword, databasePassword);

/**
 * Generar hash bcrypt en base a texto plano.
 * @param {string} password - Contraseña en texto plano.
 * @return {string} Contraseña como hash bcrypt.
 */
export const genHash = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

/**
 * Funciones para filtrar datos de los retornos JSON
 */
export const filter = {
  tokenPayload: (entity) => ({
    id: entity.IDEN_USUARIO,
    nombre: Object.keys(entity.emprendedor).length === 0 ? `${entity.persona.NOMBRES} ${entity.persona.APELLIDO_PATERNO} ${entity.persona.APELLIDO_MATERNO}` : entity.emprendedor.DESC_NOMBRE_FANTASIA,
    rol: entity.rol.CODI_ROL,
    permisos: _.map(entity.rol.permisos, 'CODI_PERMISO'),
  }),
  getUsuario: (entity) => {
    // Atributos a omitir del JSON recibido
    const omit = ['IDEN_USUARIO', 'IDEN_ROL', 'DESC_PASSWORD', 'FLAG_VIGENTE', 'FLAG_BAN', 'IDEN_PERSONA'];
    // Identifica si el usuario es una persona o emprendedor, y omitirá el objeto vacío
    omit.push(Object.keys(entity.emprendedor).length === 0 ? 'emprendedor' : 'persona');
    // Correr omitDeep y retornar JSON resultante
    return omitDeep(entity, omit);
  },
};
