var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const isLoggedMiddleware = require('../middlewares/notLogged');

router.get('/', userController.listUsers); //Método que consulta los usuarios de la base de datos (Es el que tienen que utilizar para mostrar los datos al modificar)
router.get('/profile/:id', isLoggedMiddleware, userController.profile); 
router.get('/logout', isLoggedMiddleware, userController.logout); 

router.get('/edit/:id', isLoggedMiddleware, userController.formEdit); 
router.post('/edit/:id', isLoggedMiddleware, userController.editUser); 

module.exports = router;
