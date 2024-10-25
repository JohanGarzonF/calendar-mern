const { response } = require('express')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const { JWTGenerator } = require('../helpers/jwt')

const loginUser = async ( req, res = response ) => {
    
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if ( !user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        // confirmar pwd
        const validPassword = bcrypt.compareSync( password, user.password )
        if ( !validPassword ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar JWT
        const token = await JWTGenerator( user._id, user.name )

        res.status( 200 ).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


const createUser = async ( req, res = response ) => {

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if ( user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        user = new User( req.body )

        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )

        await user.save()

        // Generar JWT
        const token = await JWTGenerator( user._id, user.name )


        res.status( 201 ).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })

    } catch (error) {

        console.log(error)
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


const revalidateToken = async ( req, res = response ) => {

    const { uid, name } = req

    // generar nuevo JWT y retornarlo en la petición

    const token = await JWTGenerator( uid, name )

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    loginUser,
    createUser,
    revalidateToken
}