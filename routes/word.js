var express = require('express');
var router = express.Router();

// require controller module
var word_controller = require('../controllers/wordController');

// GET request for one Word
router.get('/:id', word_controller.word_detail);

module.exports = router;
