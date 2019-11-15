"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const pool = require('./mysqlConnection');

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      const email_id = jwt_payload;
      let sql = `CALL User_get('${email_id}')`;
      pool.query(sql, (err, sqlResult) => {
        if (err) {
          return done(err, null);
        }
        if (sqlResult && sqlResult.length > 0 && sqlResult[0][0].status == 1) {
          return done(null, sqlResult[0][0].email_id);
        } else if(sqlResult && sqlResult.length > 0 && sqlResult[0][0].status == 0){
          return done(null, false);
        }
      });
    })
  );
}
const checkAuth = passport.authenticate("jwt", { session: false });

exports.auth = auth;
exports.checkAuth = checkAuth;