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
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
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
    },
    ischosen: { type: Boolean, required: true, "default": false }
});
var Movie = mongoose_1.model("Movie", exports.movieSchema);
exports["default"] = Movie;
