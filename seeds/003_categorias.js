exports.seed = function (knex) {
  return knex('REQ_CATEGORIAS').del()
    .then(() => {
      return knex('REQ_CATEGORIAS').insert([
        {NOMB_CATEGORIA: 'Computación y Electrónica', DESC_CATEGORIA: 'Todo lo que se enchufe o use pilas', FLAG_VIGENTE: true},
        {NOMB_CATEGORIA: 'Vida sana', DESC_CATEGORIA: 'Mejora tu calidad de vida', FLAG_VIGENTE: false},
        {NOMB_CATEGORIA: 'Comida', DESC_CATEGORIA: 'Todos los alimentos que puedas necesitar', FLAG_VIGENTE: true},
        {NOMB_CATEGORIA: 'Vestimenta', DESC_CATEGORIA: 'Te vendemos trapos realmente caros', FLAG_VIGENTE: false}
      ])
    })
    .then(() => {
      return knex.select('IDEN_CATEGORIA', 'NOMB_CATEGORIA').from('REQ_CATEGORIAS')
        .then(categorias => {
          return knex('REQ_CATEGORIAS').insert([
            {NOMB_CATEGORIA: 'Completos', DESC_CATEGORIA: 'Los panes que traen vienesa adentro', FLAG_VIGENTE: true, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Comida').IDEN_CATEGORIA},
            {NOMB_CATEGORIA: 'Pizzas', DESC_CATEGORIA: 'Sabrosas masas con mucho quesito', FLAG_VIGENTE: false, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Comida').IDEN_CATEGORIA},

            {NOMB_CATEGORIA: 'Zapatos', DESC_CATEGORIA: 'Desde chalas Zico hasta... Más chalas Zico', FLAG_VIGENTE: true, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Vestimenta').IDEN_CATEGORIA},
            {NOMB_CATEGORIA: 'Poleras', DESC_CATEGORIA: 'Con estampados muy macanudos', FLAG_VIGENTE: false, IDEN_CATEGORIA_PADRE: categorias.find(categoria => categoria.NOMB_CATEGORIA === 'Vestimenta').IDEN_CATEGORIA},            
          ])
        })
    })
}
