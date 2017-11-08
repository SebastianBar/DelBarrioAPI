exports.seed = function (knex) {
  return knex('SIS_PERMISOS_ROLES').del()
    .then(() => { return knex('SIS_ROLES').del() })
    .then(() => { return knex('SIS_PERMISOS').del() })
    .then(() => {
      return knex('SIS_ROLES').insert([
        {CODI_ROL: 101, NOMB_ROL: 'Cliente'},
        {CODI_ROL: 102, NOMB_ROL: 'Emprendedor'},
        {CODI_ROL: 103, NOMB_ROL: 'Administrador'},
      ])
    })
    .then(() => {
      return knex('SIS_PERMISOS').insert([
        {CODI_PERMISO: 101, NOMB_PERMISO: 'Denunciar'},
        {CODI_PERMISO: 102, NOMB_PERMISO: 'Moderar denuncias'},
        {CODI_PERMISO: 103, NOMB_PERMISO: 'Ver reportería'},
        {CODI_PERMISO: 104, NOMB_PERMISO: 'Agregar nuevos emprendedores'},
        {CODI_PERMISO: 105, NOMB_PERMISO: 'Publicar contenido'},
      ])
    })
    .then(() => {
      return knex.select('IDEN_PERMISO', 'CODI_PERMISO').from('SIS_PERMISOS')
        .then(permisos => {
          return knex.select('IDEN_ROL', 'CODI_ROL').from('SIS_ROLES')
            .then(roles => {
              return knex('SIS_PERMISOS_ROLES').insert([
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 101).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 101).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 102).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 105).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 102).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 103).IDEN_PERMISO},
                {IDEN_ROL: roles.find(rol => rol.CODI_ROL === 103).IDEN_ROL, IDEN_PERMISO: permisos.find(permiso => permiso.CODI_PERMISO === 104).IDEN_PERMISO},
              ])
            })
        })
    })
}
