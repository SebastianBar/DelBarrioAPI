/* global describe, it */
const { expect } = require('chai')
const axios = require('axios')

describe('Consumir  /api/persona/2', () => {
  it('GET: Obtener datos Persona', async () => {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/persona/2'
    })

    expect(res.data[0].per_id).to.equal(2)
  })

  it('POST: Crear una nueva Persona', async () => {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/persona/2'
    })

    expect(res.data[0].message).to.equal('POST: Inserta una Persona')
  })
})

describe('Ejemplos:', () => {
  it('Se espera que Retorne 3', () => {
    const suma = 1 + 5
    const resultado = 6
    expect(suma).to.equal(resultado)
  })

  it('Se espera que Retorne 6', () => {
    const suma = 1 + 5
    const resultado = 6
    expect(suma).to.equal(resultado)
  })
})
