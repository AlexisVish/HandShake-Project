"use strict";
exports.__esModule = true;
exports.db = void 0;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = express_1["default"]();
var port = 3000;
app.use(express_1["default"].json());
app.use(express_1["default"].static('public'));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//using mongoDB 
var dbUrl = "mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/";
var database = "HandShake";
mongoose_1["default"].connect(dbUrl + "/" + database).then(function () {
    console.info("DB connected");
})["catch"](function (err) {
    console.error(err);
});
var sqlite3_1 = require("sqlite3");
//using SQL inner DB
exports.db = new sqlite3_1["default"].Database(':memory:', function (err) {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    }
    else {
        console.log("Connected to the SQLite database.");
    }
});
module.exports = exports.db;
exports.db.serialize(function () {
    exports.db.run("CREATE TABLE movies (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      title TEXT NOT NULL,\n      genre TEXT NOT NULL,\n      year INTEGER,\n      image_path TEXT\n    )");
    exports.db.run("CREATE TABLE ourMovies(\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        user1_id INTEGER NOT NULL,\n        user2_id INTEGER NOT NULL,\n        movie_id INTEGER NOT NULL)");
});
var userRoute_1 = require("./routes/users/userRoute");
app.use("/api/users", userRoute_1["default"]);
var movieRoute_1 = require("./routes/movies/movieRoute");
app.use('/api/movies', movieRoute_1["default"]);
app.listen(port, function () {
    console.log("App listening on port " + port);
});
