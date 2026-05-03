const mongoose = require('mongoose')

const thumbnailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  prompt: { type: String },
  imageData: { type: String },
  style: { type: String },
  aspectRatio: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Thumbnail', thumbnailSchema)