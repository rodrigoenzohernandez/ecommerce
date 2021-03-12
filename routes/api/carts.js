var express = require('express');
var router = express.Router();
var cartAPIController = require('../../controllers/api/cartAPIController')

router.get('/', cartAPIController.cerrados)

module.exports = router;