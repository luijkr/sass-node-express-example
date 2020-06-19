var express = require('express');
var router = express.Router();

// require controller module
var browse_controller = require('../controllers/browseController');

// GET home page
router.get('/', browse_controller.browse_main);

// GET request for list of Words
router.get('/:page', browse_controller.browse_main);

module.exports = router;
