'use strict'
//import cn from '../config'

cn = require('../config');
import { Pool, Client } from 'pg'


const { Pool, Client } = require('pg')
//const connectionString = `postgresql://${cn.postgresUser}:${cn.postgresPwd}@${cn.postgresHost}:${cn.postgresPort}/${cn.postgresDb}`

// const { Client } = require('pg')
const client = new Client({
    user:     cn.postgresUser,
    host:     cn.postgresHost,
    database: cn.postgresDb,
    password: cn.postgresPwd,
    port: cn.postgresPort,
  })
  client.connect()
  
  client.query('select * from empr_personas', (err, res) => {
    console.log(err, res)
    client.end()
  })



// const mongoose = require('mongoose')
//     //   mongoose.connect('mongodb://127.0.0.1:27017/GCA_Directorio')
//       mongoose.connect(`mongodb://${cn.mongoHost}:${cn.mongoPort}/${cn.mongoDb}`)
   
// const db = mongoose.connection

//       db.on('error', console.error.bind(console, 'Connection Error: '))
//       db.once('open', function(){
//         console.log('Connection ok!')
//       })

// module.exports = mongoose