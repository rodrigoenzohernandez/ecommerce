var express = require('express');
var router = express.Router();
var usersAPIController = require('../../controllers/api/usersAPIController')

router.get('/', usersAPIController.total)

module.exports = router;