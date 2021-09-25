const mongoose = require("mongoose")

const BucketListItem = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Buckets', BucketListItem)