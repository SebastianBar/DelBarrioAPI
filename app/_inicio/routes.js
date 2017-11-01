const express = require('express')
const app = express.Router()

app.all( '/', (req,res) => {
  res.json({ message: 'GET: BIENVENIDO' })
})

export default app
