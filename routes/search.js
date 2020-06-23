var express = require('express');
var router = express.Router();

// require controller module
var search_controller = require('../controllers/searchController');

// GET home page

router.get('/', search_controller.search_execute);

module.exports = router;
