/*
    Events Routes
    /api/events
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fields-validator')

const { isDate } = require('../helpers/isDate')
const { validateJWT } = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events-controller')

const router = Router()

router.use( validateJWT )

router.get( '/', getEvents )

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha final es obligatoria').custom( isDate ),
        fieldsValidator
    ],
    createEvent
)

router.put( '/:id', updateEvent )

router.delete( '/:id', deleteEvent )



module.exports = router
