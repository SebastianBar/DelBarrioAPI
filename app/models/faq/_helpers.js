const omitDeep = require('omit-deep')

/**
 * Funciones para filtrar datos de los retornos JSON
 */
const filter = {
  GETsingle: entity => {
    const omit = ['IDEN_FAQ']
    return omitDeep(entity.toJSON(), omit)
  }
}

/* Se exportan los métodos */
module.exports = {
  filter
}
