exports.seed = function (knex) {
  let hash = (require('../app/auth/_helpers'))
  return knex('PER_TELEFONOS').del()
    .then(() => { return knex('USR_USUARIOS').del() })
    .then(() => {
      return knex.select('IDEN_ROL', 'CODI_ROL').from('SIS_ROLES')
        .then(roles => {
          return knex('USR_USUARIOS').insert([
            {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, RUT_USUARIO: 10052465, DV_USUARIO: '1', EMAIL_USUARIO: 'cliente@test.com', DESC_PASSWORD: hash.genHash('cliente'), FLAG_VIGENTE: false},
            {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, RUT_USUARIO: 14560778, DV_USUARIO: '7', EMAIL_USUARIO: 'emprendedor@test.com', DESC_PASSWORD: hash.genHash('emprendedor'), FLAG_VIGENTE: true},
            {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, RUT_USUARIO: 11478240, DV_USUARIO: '8', EMAIL_USUARIO: 'administrador@test.com', DESC_PASSWORD: hash.genHash('administrador'), FLAG_VIGENTE: true},
          ])
        })
        .then(() => {
          return knex.select('IDEN_USUARIO', 'RUT_USUARIO').from('USR_USUARIOS')
            .then(usuarios => {
              return knex('PER_TELEFONOS').insert([
                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 10052465).IDEN_USUARIO, NUMR_FONO: '+56 2 2345 6789', CODI_FONO: 1},
                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 10052465).IDEN_USUARIO, NUMR_FONO: '+56 9 8765 4321', CODI_FONO: 2},

                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 14560778).IDEN_USUARIO, NUMR_FONO: '+56 2 2876 5432', CODI_FONO: 1},
                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 14560778).IDEN_USUARIO, NUMR_FONO: '+56 9 6654 0124', CODI_FONO: 2},

                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 11478240).IDEN_USUARIO, NUMR_FONO: '+56 2 2654 1141', CODI_FONO: 1},
                {IDEN_USUARIO: usuarios.find(usuario => usuario.RUT_USUARIO === 11478240).IDEN_USUARIO, NUMR_FONO: '+56 9 9463 2101', CODI_FONO: 2},
              ])
            })
        })
    })
}
