var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WordSchema = new Schema(
  {
    word: {type: String, required: true},
    definitions: {type: [String], required: true}
  }
);

// Virtual for author's URL
WordSchema
  .virtual('url')
  .get(function () {
    return '/word/' + this.word;
  });

//Export model
module.exports = mongoose.model('Word', WordSchema);
