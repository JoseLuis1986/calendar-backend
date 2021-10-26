/*
    Rutas de Usuarios
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
// const router = express.Router;
const router = Router();

const { createUser, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/new', 
[ //middlewares
  check('name', 'el nombre es obligatorio').not().isEmpty(),
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
  validateFields
], 
createUser );

router.post('/', 
[ 
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validateFields
],
loginUsuario);

router.get('/renew', validateJWT, revalidarToken );


module.exports = router;