var express = require('express');
var router = express.Router();
const fillCategories = require('../middlewares/categorias');
const user = require('../middlewares/user');
const notLogged = require('../middlewares/notLogged');
const cartController = require('../controllers/cartController');
const notForAdmin = require('../middlewares/notForAdmin');
let { check, validationResult, body } = require('express-validator')

router.get('/', notLogged, notForAdmin, user, fillCategories, cartController.showCart); 

router.post('/addItem', [
    check('cantidad').isInt({min:1})
], notLogged, cartController.addItem); 

router.post('/removeItem', cartController.removeItem); 

router.post('/confirm', fillCategories, cartController.confirmCart); 

router.post('/editItem', fillCategories, cartController.editItem); 
 

module.exports = router;
