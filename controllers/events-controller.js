const { response } = require('express')
const Event = require('../models/event-model')

const getEvents = async ( req, res = response ) => {

    const events = await Event.find()
                            .populate('user', 'name')
    
    return res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async ( req, res = response ) => {
    const event = new Event( req.body )

    try {
        event.user = req.uid
        const savedEvent = await event.save()

        res.status(201).json({
            ok: true,
            savedEvent,
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

const updateEvent = async ( req, res = response ) => {
    const id = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById( id )

        if ( !event ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe evento por ese Id'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( id, newEvent )

        return res.status( 200 ).json({
            ok: true,
            event: updatedEvent,
            msg: 'Evento modificado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admistrador"
        })
    }

}

const deleteEvent = async ( req, res = response ) => {
    const id = req.params.id

    try {
        const event = await Event.findById( id )

        if ( !event ) {
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe evento por ese Id'
            })
        }

        if ( event.user.toString() !== req.uid ) {
            return res.status( 401 ).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento"
            })
        }

        await Event.findByIdAndDelete( id )

        res.status( 200 ).json({
            ok: true,
            msg: `El evento con id ${ id }, fue eliminado exitosamente`
        })

    } catch (error) {
        console.log(error)
        res.status( 500 ).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
