var express = require('express');
var router = express.Router();
var setupController = require('../../controllers/api/setupController')

router.post('/', setupController.setup)

module.exports = router;