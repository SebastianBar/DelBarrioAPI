var model = require('./model')

/*
**** METODOS HTTP UTILIZADOS ****
* GET:      Obtener recursos
* POST:     Crear un nuevo recurso
* PUT:      Editar un recurso
* DELETE:   Elimina un recurso
*/

/**
 * Obtener categorías.
 * @param {integer} req.params.id - ID de Categoría (opcional).
 * @return {json} Categoría(s). En caso fallido, mensaje de error.
 */
function GET (req, res) {
  const categoriaId = (typeof req.params.id === 'undefined' || isNaN(req.params.id) ) ? 0 : parseInt(req.params.id)
  if(categoriaId != 0) {
    new model.Categoria({IDEN_CATEGORIA: categoriaId}).fetch({withRelated: ['subcategorias']})
      .then(categoria => {
        if(!categoria) {
          res.status(404).json({error: true, data: {message: 'Categoria not found'}})
        } else {
          res.json({error: false, data: categoria.toJSON()})
        }
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  } else {
    new model.Categorias().query(query => { query
      .where('IDEN_CATEGORIA_PADRE', null)
      .orderBy('IDEN_CATEGORIA', 'asc')
    })
      .fetch({withRelated: ['subcategorias']})
      .then(categorias => {
        res.json({error: false, data: categorias.toJSON()})
      }).catch(err => {
        res.status(500).json({error: true, data: {message: 'Internal error'}})
        throw err
      })
  }
}

/**
 * Agregar nueva categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría.
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Categoría. En caso fallido, mensaje de error.
 */
function POST (req, res) {
  new model.Categoria({
    NOMB_CATEGORIA:       req.body.NOMB_CATEGORIA,
    IDEN_CATEGORIA_PADRE: req.body.IDEN_CATEGORIA_PADRE,
    FLAG_VIGENTE:         req.body.FLAG_VIGENTE
  }).save()
    .then(categoria => {
      res.json({error: false, data: categoria.toJSON()})
    }).catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Actualiza una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @param {string} req.body.NOMB_CATEGORIA - Nombre de la categoría (opcional).
 * @param {integer} req.body.IDEN_CATEGORIA_PADRE - ID de Categoría padre (opcional).
 * @param {boolean} req.body.FLAG_VIGENTE - Define si la categoría está activa (opcional).
 * @return {json} Mensaje de éxito o error.
 */
function PUT (req, res) {
  new model.Categoria({IDEN_CATEGORIA: req.params.id})
    .fetch({require: true})
    .then(categoria => {
      categoria.save({
        NOMB_CATEGORIA:       (typeof req.body.NOMB_CATEGORIA === 'undefined') ? categoria.get('NOMB_CATEGORIA') : req.body.NOMB_CATEGORIA,
        IDEN_CATEGORIA_PADRE: (typeof req.body.IDEN_CATEGORIA_PADRE === 'undefined') ? categoria.get('IDEN_CATEGORIA_PADRE') : req.body.IDEN_CATEGORIA_PADRE,
        FLAG_VIGENTE:         (typeof req.body.FLAG_VIGENTE === 'undefined') ? categoria.get('FLAG_VIGENTE') : req.body.FLAG_VIGENTE
      })
        .then(() => {
          res.json({error: false, data: {message: 'Categoria successfully updated'}})
        })
        .catch(err => {
          res.status(500).json({error: true, data: {message: 'Internal error'}})
          throw err
        })
    })
    .catch(model.Categoria.NotFoundError, () => {
      res.status(404).json({error: true, data: {message: 'Categoria not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/**
 * Elimina una categoría.
 * @param {integer} req.params.id - ID de la categoría.
 * @return {json} Mensaje de éxito o error.
 */
function DELETE (req, res) {
  new model.Categoria({IDEN_CATEGORIA: req.params.id})
    .destroy({require: true})
    .then(() => {
      res.json({error: false, data: {message: 'Categoria successfully deleted'}})
    })
    .catch(model.Categoria.NoRowsDeletedError, () => {
      res.status(404).json({error: true, data: {message: 'Categoria not found'}})
    })
    .catch(err => {
      res.status(500).json({error: true, data: {message: 'Internal error'}})
      throw err
    })
}

/* Se exportan los métodos */
module.exports = {
  GET,
  POST,
  PUT,
  DELETE
}
