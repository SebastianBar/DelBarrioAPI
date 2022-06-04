const hash = require('../app/auth/_helpers.js');

exports.seed = async (knex) => {
  await knex('PER_PERSONAS').del();
  await knex('PER_EMPRENDEDORES').del();
  await knex('PER_TELEFONOS').del();
  await knex('USR_USUARIOS').del();

  const roles = await knex.select('IDEN_ROL', 'CODI_ROL').from('SIS_ROLES');

  await knex('USR_USUARIOS').insert([
    {
      IDEN_ROL: roles.find((rol) => rol.CODI_ROL === 101).IDEN_ROL, EMAIL_USUARIO: 'cliente@test.com', DESC_PASSWORD: hash.genHash('cliente'), FLAG_VIGENTE: true,
    },
    {
      IDEN_ROL: roles.find((rol) => rol.CODI_ROL === 102).IDEN_ROL, EMAIL_USUARIO: 'emprendedor@test.com', DESC_PASSWORD: hash.genHash('emprendedor'), FLAG_VIGENTE: true,
    },
    {
      IDEN_ROL: roles.find((rol) => rol.CODI_ROL === 103).IDEN_ROL, EMAIL_USUARIO: 'admin@test.com', DESC_PASSWORD: hash.genHash('admin'), FLAG_VIGENTE: true,
    },
    {
      IDEN_ROL: roles.find((rol) => rol.CODI_ROL === 104).IDEN_ROL, EMAIL_USUARIO: 'superadmin@test.com', DESC_PASSWORD: hash.genHash('superadmin'), FLAG_VIGENTE: true,
    },
  ]);

  const usuarios = await knex.select('IDEN_USUARIO', 'EMAIL_USUARIO').from('USR_USUARIOS');

  await knex('PER_TELEFONOS').insert([
    // Teléfonos Cliente
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'cliente@test.com').IDEN_USUARIO, NUMR_FONO: '+56 2 2345 6789', CODI_FONO: 1 },
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'cliente@test.com').IDEN_USUARIO, NUMR_FONO: '+56 9 8765 4321', CODI_FONO: 2 },
    // Teléfonos Emprendedor
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'emprendedor@test.com').IDEN_USUARIO, NUMR_FONO: '+56 2 2876 5432', CODI_FONO: 1 },
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'emprendedor@test.com').IDEN_USUARIO, NUMR_FONO: '+56 9 6654 0124', CODI_FONO: 2 },
    // Teléfonos Administrador
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'admin@test.com').IDEN_USUARIO, NUMR_FONO: '+56 2 2654 1141', CODI_FONO: 1 },
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'admin@test.com').IDEN_USUARIO, NUMR_FONO: '+56 9 9463 2101', CODI_FONO: 2 },
    // Teléfonos Super Administrador
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'superadmin@test.com').IDEN_USUARIO, NUMR_FONO: '+56 2 2741 0041', CODI_FONO: 1 },
    { IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'superadmin@test.com').IDEN_USUARIO, NUMR_FONO: '+56 9 9974 2409', CODI_FONO: 2 },
  ]);

  const rubros = await knex.select('IDEN_RUBRO', 'NOMB_RUBRO').from('PER_RUBROS');

  await knex('PER_EMPRENDEDORES').insert([
    {
      IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'emprendedor@test.com').IDEN_USUARIO, IDEN_RUBRO: rubros.find((rubro) => rubro.NOMB_RUBRO === 'Comercio al por Mayor y Menor, Rep. Veh. Automotores / Enseres Domésticos').IDEN_RUBRO, RUT_EMPRENDEDOR: 14735068, DV_EMPRENDEDOR: '6', DESC_EMPRENDEDOR: 'Vendo los mejores cuchuflí de Providencia', DESC_NOMBRE_FANTASIA: 'Cuchuflí Master', DESC_NOMBRE_EMPRESA: 'María Joaquina e hijos Limitada',
    },
  ]);

  await knex('PER_PERSONAS').insert([
    // Cliente
    {
      IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'cliente@test.com').IDEN_USUARIO, NOMBRES: 'Luis Alberto', APELLIDO_PATERNO: 'Jara', APELLIDO_MATERNO: 'Cantillana', FECH_FECHA_NACIMIENTO: '1965-10-25T00:00:00.000Z',
    },
    // Administrador
    {
      IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'admin@test.com').IDEN_USUARIO, NOMBRES: 'John', APELLIDO_PATERNO: 'Jackson', APELLIDO_MATERNO: 'Perez', FECH_FECHA_NACIMIENTO: '1901-12-03T00:00:00.000Z',
    },
    // Super Administrador
    {
      IDEN_USUARIO: usuarios.find((usuario) => usuario.EMAIL_USUARIO === 'superadmin@test.com').IDEN_USUARIO, NOMBRES: 'Jack', APELLIDO_PATERNO: 'Johnson', APELLIDO_MATERNO: 'López', FECH_FECHA_NACIMIENTO: '1867-01-03T00:00:00.000Z',
    },
  ]);
};
