"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = express_1["default"]();
var port = 3000;
app.use(express_1["default"].json());
app.use(express_1["default"].static('public'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var dbUrl = "mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/";
var database = "HandShake";
mongoose_1["default"].connect(dbUrl + "/" + database).then(function () {
    console.info("DB connected");
})["catch"](function (err) {
    console.error(err);
});
var userRoute_1 = require("./routes/users/userRoute");
app.use("/api/users", userRoute_1["default"]);
app.listen(port, function () {
    console.log("App listening on port " + port);
});
