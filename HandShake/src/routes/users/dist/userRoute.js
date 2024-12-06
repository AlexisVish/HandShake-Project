"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setUser_1 = require("../../controllers/users/setUser");
var router = express_1["default"].Router();
router.post("/register", setUser_1.register);
router.post("/login", setUser_1.login);
exports["default"] = router;
