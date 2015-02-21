var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HeroSchema = new Schema({
    name: String,
    imgext: String,
    industry: String,
    contributions: String,
    story: String,
    books: [{book: String, author: String, link: String}]
});
/*
HeroSchema.methods.toObject = function() {
  return { name: this.name };
};*/

module.exports = mongoose.model('Hero', HeroSchema);
