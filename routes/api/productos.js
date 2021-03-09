var express = require('express');
var router = express.Router();
var productosAPIController = require('../../controllers/api/prodAPIController')

router.get('/', productosAPIController.total);
router.get('/last', productosAPIController.last);

module.exports = router;