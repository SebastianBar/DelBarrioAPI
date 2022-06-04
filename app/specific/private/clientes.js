import { Collection } from '../../models/persona/model'

/**
 * Obtener personas.
 * @param {integer} req.params.id - ID de persona (opcional).
 * @return {json} Persona(s). En caso fallido, mensaje de error.
 */
const GET = async (req, res) => {
  try {
    const entities = await new Collection().fetch({
      withRelated: ['usuario', {
        'usuario.rol': query => {
          query.where('CODI_ROL', '101')
        }
      }
      ]
    })
    res.json({ error: false, data: entities.toJSON().filter(f => typeof f.usuario.rol.CODI_ROL !== 'undefined') })
  } catch (err) {
    res.status(500).json({ error: true, data: { message: 'Internal error' } })
  }
}

/* Se exportan los métodos */
module.exports = {
  GET
}
