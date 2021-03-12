var express = require('express');
var router = express.Router();
const prodController = require('../controllers/prodController');
const fillCategories = require('../middlewares/categorias');
const isAdmin        = require('../middlewares/admin');
const user           = require('../middlewares/user');
const notForAdmin = require('../middlewares/notForAdmin');

const multer = require('multer');
const path = require('path');
let {check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/productos')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

//-------------------------------------------------------------------------------USER-ROUTES
//Lista los productos y muestra la vista de clientes
router.get('/', notForAdmin, user, fillCategories, prodController.listProducts); 

//Filtro Productos x Marca
router.get('/marcas/:id', notForAdmin, user, fillCategories, prodController.listProductsByMarca);

//Filtro Productos x Categoria
router.get('/categoria/:id',notForAdmin, user, fillCategories, prodController.listProductsByCat);

//Buscador
router.get('/results', fillCategories, prodController.search);

//Muestra el detalle del producto
router.get('/detail/:id', notForAdmin, user, fillCategories, prodController.detail); 

//-------------------------------------------------------------------------------ADMIN-ROUTES
//Lista los productos y muestra la vista de administradores
router.get('/admin', user, isAdmin, fillCategories, prodController.listProductsAdmin); 

//Muestra el formulario de creación de productos
router.get('/add', isAdmin, user, fillCategories, prodController.showAddForm); 
// !Crea un producto en la db
router.post('/add', upload.any(), [check('nomProd').isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),
body('cat').custom(function(value){
  if (value == "categoria"){
    return false
  } else {
    return true
  }
}).withMessage('Debe elegirse una categoría válida'),
check('subCat').isInt({min:1}).withMessage('Debe elegirse una subcategoría válida'),
check('marca').isInt({min:1}).withMessage('Debe elegirse una marca válida'),
check('cantidad').isInt({min:1}).withMessage('La cantidad tiene que ser mayor a 0'),
check('um').isInt({min:1}).withMessage('Debe elegirse una unidad de medida válida'),
check('estado').isInt({min:0, max:1}).withMessage('El estado debe ser Activo o Inactivo'),
check('precio').isInt({min:10}).withMessage('El precio debe ser igual o mayor a 10'),
check('descuento').isInt({min:0, max:75}).withMessage('El descuento debe tener un valor entre 0 y 75'),
check('stock').isInt({min:1}).withMessage('El stock debe ser mayor a 0'),
check('stockMin').isInt({min:1}).withMessage('El stock minimo debe ser mayor a 0')
], user, fillCategories, prodController.create); 

//Muestra el formulario de edición de productos
router.get('/edit/:id', user, isAdmin, fillCategories, prodController.showEditForm); 
//Modifica un producto de la base de datos
router.post('/edit/:id', upload.any(), [check('nomProd').isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),
body('cat').custom(function(value){
  if (value == "categoria"){
    return false
  } else {
    return true
  }
}).withMessage('Debe elegirse una categoría válida'),
check('subCat').isInt({min:1}).withMessage('Debe elegirse una subcategoría válida'),
check('marca').isInt({min:1}).withMessage('Debe elegirse una marca válida'),
check('cantidad').isInt({min:1}).withMessage('La cantidad tiene que ser mayor a 0'),
check('um').isInt({min:1}).withMessage('Debe elegirse una unidad de medida válida'),
check('estado').isInt({min:0, max:1}).withMessage('El estado debe ser Activo o Inactivo'),
check('precio').isInt({min:10}).withMessage('El precio debe ser igual o mayor a 10'),
check('descuento').isInt({min:0, max:75}).withMessage('El descuento debe tener un valor entre 0 y 75'),
check('stock').isInt({min:1}).withMessage('El stock debe ser mayor a 0'),
check('stockMin').isInt({min:1}).withMessage('El stock minimo debe ser mayor a 0')
], user, fillCategories, prodController.edit); 

module.exports = router;