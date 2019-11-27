"use strict";
const { getTopViewedTweets } = require("./getTopViewedTweets");
const { getTopLikedTweets } = require("./getTopLikedTweets");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "get_top_viewed_tweets":
            getTopViewedTweets(msg, callback);
            break;
        
        case "get_top_liked_tweets":
            getTopLikedTweets(msg, callback);
            break;
    }
}

exports.handle_request = handle_request;