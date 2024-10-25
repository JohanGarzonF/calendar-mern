/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { loginUser, createUser, revalidateToken } = require('../controllers/auth-controller')
const { fieldsValidator } = require('../middlewares/fields-validator')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check( 'password', 'El password es debe ser de mínimo de 6 caracteres' ).isLength({ min: 6 }),
        fieldsValidator,
    ], 
    loginUser
)
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El password es debe ser de mínimo de 6 caracteres' ).isLength({ min: 6 }),
        fieldsValidator,
    ], 
    createUser
)
router.get('/renew', validateJWT, revalidateToken )

module.exports = router