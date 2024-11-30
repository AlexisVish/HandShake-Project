"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    email: String,
    phone: Number,
    password: String
});
var User = mongoose_1.model("User", exports.userSchema);
exports["default"] = User;
