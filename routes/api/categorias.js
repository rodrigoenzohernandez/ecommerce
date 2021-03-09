var express = require('express');
var router = express.Router();
var catAPIController = require('../../controllers/api/catAPIController')

router.get('/', catAPIController.list)

module.exports = router;