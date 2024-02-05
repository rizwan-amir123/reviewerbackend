const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    image: {
      type: [String],
      default: []
    },
    overall: {
      type: Number,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    reviewTime: {
      type: String,
      required: true
    },
    reviewerID: {
      type: String,
      required: true
    },
    asin: {
      type: String,
      required: true
    },
    style: {
      Size: {
        type: String,
        default: ''
      },
      Color: {
        type: String,
        default: ''
      }
    },
    reviewerName: {
      type: String,
      default: ''
    },
    reviewText: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    unixReviewTime: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model("ReviewCollection", reviewSchema);
