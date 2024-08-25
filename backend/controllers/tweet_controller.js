const Tweet = require("../model/Tweet");
const { format } = require("date-fns");

//When user makes API get request, retrieve all tweets from MongoDB database and send them to frontend
const get_all_tweets = async (request, response) => {
  const tweets = await Tweet.find();
  if (!tweets) return response.status(204).json({ "message": "No tweets found in database." });
  response.json(tweets);
};

//Create new tweet with info specified in API post request and add this tweet to database
const create_new_tweet = async (request, response) => {
  if (!request?.body?.username || !request?.body?.tweet_body) {
    return response.status(400).json( { "message": "Username and tweet body are required." });
  }
  try {
    const date = `${format(new Date(), "MM/dd/yy - h:mm a")}`;
    const result = await Tweet.create({
      username: request.body.username,
      tweet_body: request.body.tweet_body,
      date: date
    });
    response.status(201).json(result);
  }
  catch (err) {
    console.error(err);
  }
};

module.exports = { 
  get_all_tweets,
  create_new_tweet
};
