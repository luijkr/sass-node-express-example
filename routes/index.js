var express = require('express');
var router = express.Router();
var async = require('async');

var Word = require('../models/word');

/* GET home page. */
router.get('/', function(req, res, next) {

  async.parallel({
    word_count: function(callback) {
      Word.countDocuments({}, callback);
    }
  },
    function(err, results) {
      res.render('index', { title: 'Bootstrap 4 layout', error: err, data: results });
    }
  )
});

module.exports = router;
