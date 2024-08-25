const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweet_schema = new Schema({
  username: {
    type: String,
    required: true
  },
  tweet_body: {
    type: String,
    required: true
  },
  date: {
    type: String,
  }
});

module.exports = mongoose.model("Tweet", tweet_schema);
