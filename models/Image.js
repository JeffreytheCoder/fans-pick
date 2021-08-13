const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
  name: String,
  img: { data: Buffer, contentType: String },
});

module.exports = Image = mongoose.model('image', ImageSchema);
