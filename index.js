const path = require('path')
const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/config')
const cors = require('cors')
const PORT = process.env.PORT


const app = express()

// base de datos
dbConnection()

//cors

app.use( cors() )


// Directorio Público
app.use( express.static('public') )

// lectura y parseo del body
app.use( express.json() )

// Rutas
app.use( '/api/auth', require('./routes/auth-route') )
app.use( '/api/events', require('./routes/events-route') )

app.use('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) )
})

app.listen( PORT, () => {
    console.log(`server runing in http://localhost:${ PORT }`)
})

