'use strict'
import models from './model'
import express from 'express'
const app = express.Router()

    app.route('/persona/:id?')
        .get    ( (req,res)=> models.getPersona(req,res) )
        .post   ( (req,res)=> models.savePersona(req,res) )
        //.put    ( (req,res)=> models.putDatos(req,res) )
        .delete ( (req,res)=> models.deletePersona(req,res) )

export default app
