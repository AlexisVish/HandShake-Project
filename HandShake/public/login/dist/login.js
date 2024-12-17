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
// Create the main Login class
var LoginForm = /** @class */ (function () {
    function LoginForm(appId) {
        this.appContainer = document.getElementById(appId);
        if (!this.appContainer) {
            throw new Error("App container not found");
        }
        this.formContainer = document.createElement("div");
        this.formContainer.classList.add("form-container");
        this.appContainer.appendChild(this.formContainer);
    }
    LoginForm.prototype.renderForm = function () {
        this.formElement = this.createFormElement();
        this.formContainer.appendChild(this.formElement);
    };
    // Create the form dynamically
    LoginForm.prototype.createFormElement = function () {
        var _this = this;
        var form = document.createElement("form");
        form.classList.add("register-form"); // Reuse same styles as Register
        // Heading
        var heading = document.createElement("h1");
        heading.textContent = "Login";
        heading.classList.add("form-title");
        form.append(heading, this.createInputField("Email", "email", "email"), this.createInputField("Password", "password", "password"), this.createCheckboxField("Remember Me"), this.createSubmitButton());
        form.addEventListener("submit", function (event) { return _this.handleSubmit(event); });
        return form;
    };
    LoginForm.prototype.createInputField = function (labelText, type, name) {
        var wrapper = document.createElement("div");
        wrapper.classList.add("form-group");
        var label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", name);
        var input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = name;
        input.required = true;
        wrapper.append(label, input);
        return wrapper;
    };
    LoginForm.prototype.createCheckboxField = function (labelText) {
        var wrapper = document.createElement("div");
        wrapper.classList.add("checkbox-group");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = "rememberMe";
        input.id = "rememberMe";
        var label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", "rememberMe");
        wrapper.append(input, label);
        return wrapper;
    };
    LoginForm.prototype.createSubmitButton = function () {
        var button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Login";
        button.classList.add("submit-button");
        return button;
    };
    // Handle form submission
    LoginForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var formData = new FormData(event.target);
        var user = {
            email: formData.get("email"),
            password: formData.get("password"),
            rememberMe: !!formData.get("rememberMe")
        };
        this.sendDataToServer(user);
    };
    // Send data to the server
    LoginForm.prototype.sendDataToServer = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/users/login", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(user),
                                credentials: "include"
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Login failed. Please check your credentials.");
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        // Save token if Remember Me is checked
                        if (user.rememberMe && data.token) {
                            localStorage.setItem("authToken", data.token); // Save token for client-side use
                        }
                        alert("Welcome " + data.user.fullName + "!");
                        window.location.href = "/meeting/meeting.html"; // Redirect after login
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        alert(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LoginForm;
}());
// Initialize the Login form
document.addEventListener("DOMContentLoaded", function () {
    var loginForm = new LoginForm("app");
    loginForm.renderForm();
});
