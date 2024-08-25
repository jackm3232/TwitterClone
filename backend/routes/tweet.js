const express = require("express");
const router = express.Router();
const path = require("path");
const tweet_controller = require("../controllers/tweet_controller");

router.route("/").get(tweet_controller.get_all_tweets);
router.route("/").post(tweet_controller.create_new_tweet);

module.exports = router;
