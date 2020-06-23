var async = require('async');

var Word = require('../models/word');

// display definitions for a specific Word
exports.word_detail = function(req, res, next) {

  async.parallel({
    word: function(callback) {
        Word.findOne( { word: req.params.id }, callback )
    }
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.word == null) { // No results.
        var err = new Error('Word not found');
        err.status = 404;
        return next(err);
    }
    // Successful, so render.
    res.render('word_detail', { word: results.word } );
  });

};
