
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('EMPR_PERsonas').del()
    .then(function () {
      // Inserts seed entries
      return knex('EMPR_PERsonas').insert([
        {PER_Rut: 1, PER_Dv: '1', PER_Nombre: 'JOAQUIN', PER_ApePat: 'CASTRO', PER_ApeMat: 'VERA', PER_Estado: true},
        {PER_Rut: 1, PER_Dv: '1', PER_Nombre: 'CESAR', PER_ApePat: 'SANTELICES', PER_ApeMat: 'CARCAMO', PER_Estado: true},
        {PER_Rut: 1, PER_Dv: '1', PER_Nombre: 'BEATRIZ', PER_ApePat: 'ROCO', PER_ApeMat: 'VERA', PER_Estado: true},
        {PER_Rut: 1, PER_Dv: '1', PER_Nombre: 'GUILLERMO', PER_ApePat: 'CARCAMO', PER_ApeMat: 'TAPIA', PER_Estado: true},
        {PER_Rut: 1, PER_Dv: '1', PER_Nombre: 'JOHANNA', PER_ApePat: 'REYES', PER_ApeMat: 'HERNANDEZ', PER_Estado: true}
      ]);
    });
};
