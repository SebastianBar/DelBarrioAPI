'use strict'
// Inyection of Dependencies
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import cn from './config'

//LOG
import logger from 'simple-express-logger'
import fs from 'fs' 
import morgan from 'morgan'             //Generate log
import path from 'path'
import rfs from 'rotating-file-stream'  //Unique log day

import moment from 'moment'
moment.locale('es');


//DATABASE
// import mongoose from 'mongoose'
// mongoose.Promise = global.Promise;

//PUBLIC AND PRIVATE PATH
import publicRoutes from './app/public.routes'
import privateRoutes from './app/private.routes'


const app = express()

// LOGS
// =============================================================================
const logDirectory = path.join(__dirname, 'log/') 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs(`${moment().format('DD-MM-YYYY')}_access.log`, {
  interval: '1d', // rotate daily  //   interval: '5s', // rotate 5 segundos
  path: logDirectory
})

// MIDLEWARES
// =============================================================================
app.use(logger());
app.use(morgan('combined', {stream: accessLogStream} ))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

const router = express.Router();  

// INCLUDE ROUTES - PRIVATE AND PUBLIC
// =============================================================================
const publicRoute  = publicRoutes.map (p => app.use('/api', p) );
const privateRoute = privateRoutes.map(p => app.use('/api/private', p) );

app.listen(cn.apiPort, () => { console.log(`API REST corriendo en ${cn.apiHost}:${cn.apiPort}`); })

export default app
