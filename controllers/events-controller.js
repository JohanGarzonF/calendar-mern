const { response } = require('express')
const Event = require('../models/event-model')

const getEvents = ( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'Obtener eventos'
    })
}

const createEvent = async ( req, res = response ) => {
    const event = new Event( req.body )

    try {
        
        await event.save()

        res.status(201).json({
            ok: true,
            msg: 'Evento creado exitosamente'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }
}

const updateEvent = ( req, res = response ) => {
    const id = req.params.id
    return res.status( 200 ).json({
        ok: true,
        id,
        msg: 'Evento modificado'
    })
}

const deleteEvent = ( req, res = response ) => {
    const id = req.params.id
    return res.status(200).json({
        ok: true,
        id,
        msg: 'Evento eliminado exitosamente'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
