var express = require('express');
var router = express.Router();
var usersAPIController = require('../../controllers/api/usersApiController')

router.get('/', usersAPIController.total)

module.exports = router;