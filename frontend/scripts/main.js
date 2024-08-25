//Make API get request to backend in order to retrieve all tweets from MongoDB database, display these tweets
const display_posted_tweets = async () => {
  try {
    const posted_tweets = await fetch("http://localhost:3500/tweet").then(response => response.json());
    posted_tweets.reverse();
    posted_tweets.forEach(tweet => {
      const posted_tweets_container = document.getElementById("posted_tweets_container");
      
      const posted_tweet_div = document.createElement("div");
      posted_tweet_div.className = "posted_tweet";

      const posted_username_div = document.createElement("div");
      posted_username_div.className = "posted_username";
      posted_username_div.textContent = tweet.username;

      const posted_tweet_body_div = document.createElement("div");
      posted_tweet_body_div.className = "posted_tweet_body";
      posted_tweet_body_div.textContent = tweet.tweet_body;

      const posted_date_div = document.createElement("div");
      posted_date_div.className = "posted_date";
      posted_date_div.textContent = tweet.date;

      posted_tweet_div.appendChild(posted_username_div);
      posted_tweet_div.appendChild(posted_tweet_body_div);
      posted_tweet_div.appendChild(posted_date_div);

      posted_tweets_container.appendChild(posted_tweet_div);
    });
  }
  catch (err) {
    console.error(err);
    const posted_tweets_container = document.getElementById("posted_tweets_container");

    const error_tweet_div = document.createElement("div");
    error_tweet_div.className = "posted_tweet";

    const error_message_div = document.createElement("div");
    error_message_div.className = "posted_tweet_body";
    error_message_div.textContent = "Error receiving and displaying tweets...";
    error_message_div.style.color = "red";
    error_message_div.style.marginBottom = "0px";

    error_tweet_div.appendChild(error_message_div);
    posted_tweets_container.appendChild(error_tweet_div);
  }
};

display_posted_tweets();

//Reload page if user clicks twitter logo
document.getElementById("twitter_logo").addEventListener("click", (event) => {
  location.reload();
});

//Make sure username length is no more than 20 characters, update tweet button styles accordingly
document.getElementById("username_box").addEventListener("input", (event) => {
  const username_length = document.getElementById("username_box").value.length;
  const tweet_body_length = document.getElementById("tweet_body_box").value.length;
  const tweet_button = document.getElementById("tweet_button");

  if (username_length > 20 || tweet_body_length > 280 || tweet_body_length === 0) {
    tweet_button.classList.remove("button_can_tweet");
  }
  else {
    tweet_button.classList.add("button_can_tweet");
  }
});

//Update character count for tweet body each time a character is inputted/deleted
//Make sure tweet body length is no more than 280 characters, update character count and tweet button styles accordingly
document.getElementById("tweet_body_box").addEventListener("input", (event) => {
  const char_counter = document.getElementById("char_counter");
  const tweet_body_length = document.getElementById("tweet_body_box").value.length;
  const tweet_button = document.getElementById("tweet_button");
  char_counter.innerHTML = `${tweet_body_length}/280`;

  if (tweet_body_length > 280) {
    char_counter.style.color = "red";
    tweet_button.classList.remove("button_can_tweet");
  }
  else if (tweet_body_length === 0) {
    tweet_button.classList.remove("button_can_tweet");
  }
  else {
    char_counter.style.color = "black";
    tweet_button.classList.add("button_can_tweet");
  }
});

//If user clicks the "Tweet" button and their tweet is valid,
//make API post request to backend in order to create a new tweet with content specified by user
document.getElementById("tweet_button").addEventListener("click", async (event) => {
  let username = document.getElementById("username_box").value;
  const tweet_body = document.getElementById("tweet_body_box").value;

  if (tweet_body.length > 0 && tweet_body.length <= 280 && username.length <= 100) {
    if (username.length === 0) {
      username = "Anonymous";
    }
    
    await fetch("http://localhost:3500/tweet", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        tweet_body: tweet_body
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json());

    location.reload();
  }
});
