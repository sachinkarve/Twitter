const Users = require('../../models/users');
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

async function getProfile(msg, callback) {
    let response = {};
    let err = {};
    try {
        let user = await Users.findById(msg.user_id);

        if (!user) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.ACTION_NOT_COMPLETE;
            return callback(err, null);
        } else {
            let profile = {
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                email_id: user.email_id,
                user_bio: user.user_bio,
                user_image: user.user_image,
                city: user.city,
                state: user.state,
                zip_code: user.zip_code
            };

            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(profile);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getProfile = getProfile;