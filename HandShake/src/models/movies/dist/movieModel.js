"use strict";
exports.__esModule = true;
exports.movieSchema = void 0;
var mongoose_1 = require("mongoose");
exports.movieSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});
var Movie = mongoose_1.model("Movie", exports.movieSchema);
exports["default"] = Movie;
