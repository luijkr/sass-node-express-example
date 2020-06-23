var async = require('async');

var Word = require('../models/word');

// exports.browse_main = function(req, res) {
//   res.render('browse', { title: 'Browse this dictionary' });
// };

// display list of words on Browse page
exports.browse_main = function(req, res, next) {

  const resPerPage = 5; // results per page
  const page = Number(req.query.page) || Number(1); // set default page to 1 if not provided

  async.parallel({

    words: function(callback) {
      Word.find({})
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage)
        .exec(callback)
    },

    totalWords: function(callback) {
      Word.count( {} )
        .exec(callback)
    }

  }, function(err, results) {
    if (err) { return next(err); }
    if (results.words == null) { // No results.
        var err = new Error('Words not found');
        err.status = 404;
        return next(err);
    }

    // calculate total pages, previous page, next page
    const totalPages = Math.ceil(results.totalWords / resPerPage);
    const previousPage = (page == 1) ? null : (page - 1);
    const nextPage = (page == totalPages) ? null : (page + 1);

    res.render('browse', {
      title: 'Browse this dictionary',
      words: results.words,
      totalWords: results.totalWords,
      totalPages: totalPages,
      currentPage: page,
      previousPage: previousPage,
      nextPage: nextPage
    } );
  });

};