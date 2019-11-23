"use strict";
const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const redisClient = require("../../utils/redisConfig");

let getUserTweets = async (msg, callback) => {
    let response = {};
    let err = {};
    const page_number = msg.page_number;
    const page_size = 10;
    try {
        redisClient.get(msg.user_id, async (err, tweetResults) => {
           if (tweetResults) {
                    response.status = STATUS_CODE.SUCCESS;
                    response.data = JSON.stringify(tweetResults);
                return callback(null, response);
            } else {
            let userTweets = await Users.findById(msg.user_id, { tweets: 1, retweeted_tweets: 1 })
                .populate({
                    path: 'tweets',
                    select: 'tweet_text tweet_owner',
                    options: {
                        sort: { tweet_date: -1 },
                        skip: (page_number - 1) * page_size,
                        limit: page_size
                    },
                })
                .populate("retweeted_tweets", "tweet_text tweet_owner");
                if (!userTweets) {
                    err.status = STATUS_CODE.BAD_REQUEST;
                    err.data = MESSAGES.ACTION_NOT_COMPLETE;
                    return callback(err, null);
                }
                else {
                    redisClient.setex(msg.user_id, 36000, JSON.stringify(userTweets));
                    response.status = STATUS_CODE.SUCCESS;
                    response.data = JSON.stringify(userTweets);
                    return callback(null, response);
                }
            }
        });
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};
exports.getUserTweets = getUserTweets;