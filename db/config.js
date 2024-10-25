const moogose = require('mongoose')

const dbConnection = () => {

    moogose.connect( process.env.DB_CNN ).then( () => {
        console.log('DB online')
    }).catch( error => {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos')
    })

}


module.exports = {
    dbConnection
}