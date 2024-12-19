"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cookie_parser_1 = require("cookie-parser");
var app = express_1["default"]();
var port = 3000;
app.use(express_1["default"].json());
app.use(express_1["default"].static("public"));
app.use(cookie_parser_1["default"]());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
//using mongoDB
var dbUrl = "mongodb+srv://Yulia:r0MTDkJoo6ropL10@cluster0.gl27q.mongodb.net";
var database = "HandShake";
mongoose_1["default"]
    .connect(dbUrl + "/" + database)
    .then(function () {
    console.info("DB connected");
})["catch"](function (err) {
    console.error(err);
});
var userRoute_1 = require("./routes/users/userRoute");
app.use("/api/users", userRoute_1["default"]);
var meetingRoute_1 = require("./routes/meeting/meetingRoute");
app.use("/api/meeting", meetingRoute_1["default"]);
var movieRoute_1 = require("./routes/movies/movieRoute");
app.use("/api/movies", movieRoute_1["default"]);
app.listen(port, function () {
    console.log("App listening on port " + port);
});
