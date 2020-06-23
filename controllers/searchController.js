var async = require('async');
var bodyParser = require('body-parser');

var Word = require('../models/word');

// display list of words on Browse page
exports.search_execute = function(req, res, next) {

  async.parallel({

    word: function(callback) {
      Word.findOne({ word: req.query.search })
        .exec(callback)
    }

  }, function(err, results) {
    if (err) { return next(err); }

    res.render('search', {
      title: 'Search results',
      word: results.word
    } );
  });

};