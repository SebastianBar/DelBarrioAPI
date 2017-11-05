exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('SIS_ROLES').del()
    .then(function () {
      // Inserts seed entries
      return knex('SIS_ROLES').insert([
        {CODI_ROL: 100, NOMB_ROL: 'Autenticar', DESC_ROL: 'Permite ingresar a la plataforma'},
        {CODI_ROL: 101, NOMB_ROL: 'Publicar', DESC_ROL: 'Permite publicar productos y servicios'},
      ])
    })
}
