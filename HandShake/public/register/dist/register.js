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
// class for creating registration form
var RegisterForm = /** @class */ (function () {
    function RegisterForm() {
    }
    RegisterForm.prototype.createForm = function () {
        var form = document.createElement("form");
        form.id = "form";
        form.innerHTML = "\n      <div id=\"form__field\">\n        <label for=\"name\" id=\"form__label\">Name:</label>\n        <input type=\"text\" id=\"name\" name=\"name\" id=\"form__input\" placeholder=\"Enter your name\" required>\n      </div>\n      <div id=\"form__field\">\n        <label for=\"email\" id=\"form__label\">Email:</label>\n        <input type=\"email\" id=\"email\" name=\"email\" id=\"form__input\" placeholder=\"Enter your email\" required>\n      </div>\n      <div id=\"form__field\">\n        <label for=\"phone\" id=\"form__label\">Phone:</label>\n        <input type=\"tel\" id=\"phone\" name=\"phone\" id=\"form__input\" placeholder=\"Enter your phone number\" required>\n      </div>\n      <div id=\"form__field\">\n        <label for=\"password\" id=\"form__label\">Password:</label>\n        <input type=\"password\" id=\"password\" name=\"password\" id=\"form__input\" placeholder=\"Enter your password\" required>\n      </div>\n      <div id=\"form__field\">\n        <button type=\"submit\" id=\"form__button\">Register</button>\n      </div>\n    ";
        return form;
    };
    return RegisterForm;
}());
// class for validating email and phone
var FormValidator = /** @class */ (function () {
    function FormValidator() {
    }
    FormValidator.isValidEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    FormValidator.isValidPhone = function (phone) {
        var phoneRegex = /^[0-9]{10,15}$/;
        return phoneRegex.test(phone);
    };
    return FormValidator;
}());
// function for submitting registration form and sending data to the server
function submitRegistrationForm(event) {
    return __awaiter(this, void 0, void 0, function () {
        var form, formData, name, email, phone, password, response, error, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    event.preventDefault();
                    form = event.target;
                    formData = new FormData(form);
                    name = formData.get("name");
                    email = formData.get("email");
                    phone = formData.get("phone");
                    password = formData.get("password");
                    if (!name || !email || !phone || !password) {
                        alert("All fields are required");
                        return [2 /*return*/];
                    }
                    if (!FormValidator.isValidEmail(email)) {
                        alert("Please enter a valid email address");
                        return [2 /*return*/];
                    }
                    if (!FormValidator.isValidPhone(phone)) {
                        alert("Please enter a valid phone number");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("http://localhost:3000/api/users/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name: name, email: email, phone: phone, password: password })
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    error = _a.sent();
                    alert("Registration failed: " + (error.message || "Unknown error"));
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    user = _a.sent();
                    console.log("User registered:", user);
                    form.reset();
                    alert("User " + user.name + " registered successfully");
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error registering user:", error_1);
                    alert("Failed to register user");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// getting app container and adding registration form to it
var appContainer = document.getElementById("app");
if (appContainer) {
    var form = new RegisterForm().createForm();
    form.addEventListener("submit", submitRegistrationForm);
    appContainer.appendChild(form);
}
else {
    console.error("App container not found");
}
