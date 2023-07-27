const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  url: String,
  likes: Number,
  author: String,
  isLiked: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

blogSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)