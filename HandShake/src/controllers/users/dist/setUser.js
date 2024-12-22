"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.login = exports.register = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var jwt_simple_1 = require("jwt-simple");
var bcrypt_1 = require("bcrypt");
var userModel_1 = require("../../models/users/userModel");
var secret = process.env.SECRET_KEY; // Secret key from .env
var saltRounds = parseInt(process.env.SALT_ROUNDS || "10"); // Salt rounds from .env
// Register controller
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, fullName, email, phone, password, confirmPassword, termsAgreed, existingUser, hashedPassword, newUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, fullName = _a.fullName, email = _a.email, phone = _a.phone, password = _a.password, confirmPassword = _a.confirmPassword, termsAgreed = _a.termsAgreed;
                    if (!fullName ||
                        !email ||
                        !phone ||
                        !password ||
                        !confirmPassword ||
                        !termsAgreed) {
                        res.status(400).json({ error: "All fields are required" });
                        return [2 /*return*/];
                    }
                    if (password !== confirmPassword) {
                        res.status(400).json({ error: "Passwords do not match" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, userModel_1.User.findOne({ email: email })];
                case 1:
                    existingUser = _b.sent();
                    if (existingUser) {
                        res.status(400).json({ error: "User with this email already exists" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1["default"].hash(password, saltRounds)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, userModel_1.User.create({
                            fullName: fullName,
                            email: email,
                            phone: phone,
                            password: hashedPassword,
                            termsAgreed: termsAgreed
                        })];
                case 3:
                    newUser = _b.sent();
                    return [2 /*return*/, res.status(201).json({
                            message: "User registered successfully",
                            user: newUser
                        })];
                case 4:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
// Login controller
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, rememberMe, user, isPasswordValid, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password, rememberMe = _a.rememberMe;
                    // Validate required fields
                    if (!email || !password) {
                        return [2 /*return*/, res.status(400).json({ error: "Email and password are required" })];
                    }
                    return [4 /*yield*/, userModel_1.User.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(401).json({ error: "Invalid email or password" })];
                    }
                    return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
                case 2:
                    isPasswordValid = _b.sent();
                    if (!isPasswordValid) {
                        return [2 /*return*/, res.status(401).json({ error: "Invalid email or password" })];
                    }
                    token = jwt_simple_1["default"].encode({
                        id: user._id,
                        exp: Math.floor(Date.now() / 1000) +
                            (rememberMe ? 7 * 24 * 60 * 60 : 60 * 60)
                    }, secret);
                    // Set token in HTTP-only cookie
                    res.cookie("token", token, {
                        httpOnly: false,
                        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000
                    });
                    // Send response to client
                    return [2 /*return*/, res.status(200).json({
                            message: "Login successful",
                            user: {
                                fullName: user.fullName
                            },
                            token: token
                        })];
                case 3:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
