var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideosSchema = new Schema({
    name: String,
    start: String,
    end: String,
    videoid: String
});
/*
VideoSchema.methods.toObject = function() {
  return { name: this.name };
};
*/

module.exports = mongoose.model('Video', VideoSchema);

