"use strict";
exports.__esModule = true;
exports.meetingSchema = void 0;
var mongoose_1 = require("mongoose");
exports.meetingSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    }
});
var Meeting = mongoose_1.model("Meeting", exports.meetingSchema);
exports["default"] = Meeting;
