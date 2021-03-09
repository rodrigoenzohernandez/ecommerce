var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const isLogged = require('../middlewares/logged');
const fillCategories = require('../middlewares/categorias');
const setIndex = require('../middlewares/setIndex');
const { check, body } = require('express-validator');

router.get('/', setIndex, fillCategories, indexController.showProductsIndex)

router.get('/register', isLogged, indexController.formRegister);
router.post('/register', [
    check('name').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres. Val'),
    check('apellido').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres. Val'),
    check('email').isEmail().withMessage('Formato de email incorrecto. Val'),
    body('psw').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres Val'),
    body('rpsw').custom((value, { req }) => req.body.psw == value).withMessage('Las contraseñas no coinciden Val')
], indexController.checkRegister)

router.get('/login', isLogged, indexController.formLogin);
router.post('/login', indexController.checkUser);

module.exports = router;
