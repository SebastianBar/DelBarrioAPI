exports.up = function(knex, Promise) {
  return knex.schema.createTable('EMPR_PERsonas', function(t) {
    t.increments('PER_Id').unsigned().primary()
    t.integer('PER_Rut').notNull()
    t.string('PER_Dv', 1).notNull() // Investigar tipo Char en knex migrations
    t.string('PER_Nombre', 30).notNull()
    t.string('PER_ApePat', 30).notNull()
    t.string('PER_ApeMat', 30).notNull()
    t.boolean('PER_Estado').notNull()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('EMPR_PERsonas');
}
