const { Router, application } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require("../middlewares/validate-jwt");
/* Event Routes
   /api/events
*/

//Todas tienen que pasar por la validacion del JWT
//Obtener eventos

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'titulo es obligatorio').not().isEmpty(),
        check('start', 'start es obligatorio').custom( isDate ),
        check('end', 'end es obligatorio').custom( isDate ),
        validateFields
    ],
    createEvents);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;