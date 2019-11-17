"use strict";
const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const follow = require("./routes/follow");
const tweets = require("./routes/tweets");
const messages = require("./routes/messages");
const account = require("./routes/account");
const search = require("./routes/search");

app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", profile);
app.use("/api/follow", follow);
app.use("/api/tweets", tweets);
app.use("/api/message", messages);
app.use("/api/account", account);
app.use("/api/search", search);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
