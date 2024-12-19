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
var MovieApp = /** @class */ (function () {
    function MovieApp(container) {
        this.movies = [];
        this.myMovies = [];
        this.currentMovieIndex = 0;
        if (!container) {
            throw new Error("Movie container not found.");
        }
        this.movieContainer = container;
        this.init();
    }
    // Initialize the app by fetching movies and rendering the first movie
    MovieApp.prototype.init = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchMovies()];
                    case 1:
                        _a.sent();
                        if (this.movies.length) {
                            this.renderMovie();
                        }
                        else {
                            this.displayNoMoviesMessage();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Fetch movies from the server
    MovieApp.prototype.fetchMovies = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/movies/get-all-movies")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.movies = data.movies;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching movies:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Render the current movie
    MovieApp.prototype.renderMovie = function () {
        this.movieContainer.innerHTML = ""; // Clear the container
        var movie = this.movies[this.currentMovieIndex];
        var movieCard = this.createMovieCard(movie);
        var buttonsContainer = this.createButtons();
        this.movieContainer.appendChild(movieCard);
        this.movieContainer.appendChild(buttonsContainer);
    };
    // Создание карточки фильма
    MovieApp.prototype.createMovieCard = function (movie) {
        var movieCard = document.createElement("div");
        movieCard.className = "card";
        movieCard.innerHTML = "\n      <div class=\"card__image-wrapper\">\n        <img src=\"" + movie.imageURL + "\" alt=\"" + movie.title + "\" class=\"card__image\">\n      </div>\n      <div class=\"card__info\">\n        <h2>" + movie.title + "</h2>\n        <p><strong>Genre:</strong> " + movie.genre + "</p>\n        <p><strong>Director:</strong> " + movie.director + "</p>\n        <p><strong>Year:</strong> " + movie.year + "</p>\n        <p><strong>Rating:</strong> " + movie.rating + "</p>\n      </div>\n    ";
        return movieCard;
    };
    // Create Yes and No buttons
    MovieApp.prototype.createButtons = function () {
        var _this = this;
        var buttonsContainer = document.createElement("div");
        buttonsContainer.className = "buttons-container";
        var yesButton = this.createButton("Yes", "yes-button", function () {
            return _this.handleYesClick();
        });
        var noButton = this.createButton("No", "no-button", function () {
            return _this.handleNoClick();
        });
        buttonsContainer.appendChild(yesButton);
        buttonsContainer.appendChild(noButton);
        return buttonsContainer;
    };
    // Create a reusable button
    MovieApp.prototype.createButton = function (text, className, onClick) {
        var button = document.createElement("button");
        button.textContent = text;
        button.className = className;
        button.addEventListener("click", onClick);
        return button;
    };
    // Handle Yes button click
    MovieApp.prototype.handleYesClick = function () {
        var movie = this.movies[this.currentMovieIndex];
        this.myMovies.push(movie);
        this.nextMovie();
    };
    // Handle No button click
    MovieApp.prototype.handleNoClick = function () {
        this.nextMovie();
    };
    // Show the next movie or display a message if no more movies
    MovieApp.prototype.nextMovie = function () {
        this.currentMovieIndex++;
        if (this.currentMovieIndex < this.movies.length) {
            this.renderMovie();
        }
        else {
            this.displayNoMoviesMessage();
        }
    };
    // Display a message when no more movies are available
    MovieApp.prototype.displayNoMoviesMessage = function () {
        this.sendMyMoviesToServer(); // Отправляем фильмы на сервер
        this.movieContainer.innerHTML = "\n      <div class=\"end-message\">\n        <p>No more movies to display.</p>\n        <h2>Selected movies:</h2>\n        <ul>\n          " + this.myMovies.map(function (movie) { return "<li>" + movie.title + "</li>"; }).join("") + "\n        </ul>\n        <a href=\"/home/home.html\" class=\"home-link\">Go to Home</a>\n      </div>\n    ";
    };
    // Send the collected movies to the server
    MovieApp.prototype.sendMyMoviesToServer = function () {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var userId, token, decodedToken, meetingId, response, _c, _d, _e, error_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        token = (_a = document.cookie
                            .split("; ")
                            .find(function (row) { return row.startsWith("token="); })) === null || _a === void 0 ? void 0 : _a.split("=")[1];
                        if (token) {
                            decodedToken = JSON.parse(atob(token.split(".")[1]));
                            userId = decodedToken.id; // Присваиваем значение
                            console.log("Decoded User ID:", userId);
                        }
                        else {
                            console.error("Token not found in cookies.");
                        }
                        // Теперь userId доступен в коде ниже
                        if (!userId) {
                            console.error("User ID not found in cookies. Ensure the user is logged in.");
                            return [2 /*return*/];
                        }
                        meetingId = (_b = document.cookie
                            .split("; ")
                            .find(function (row) { return row.startsWith("meetingId="); })) === null || _b === void 0 ? void 0 : _b.split("=")[1];
                        if (!userId) {
                            console.error("User ID not found in cookies. Ensure the user is logged in.");
                            return [2 /*return*/];
                        }
                        if (!meetingId) {
                            console.error("Meeting ID not found in cookies. Ensure the user is logged in.");
                            return [2 /*return*/];
                        }
                        if (this.myMovies.length === 0) {
                            console.log("No movies to send to the server.");
                            return [2 /*return*/];
                        }
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fetch("http://localhost:3000/api/movies/add-movies-to-meeting", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    userId: userId,
                                    meetingId: meetingId,
                                    myMovies: this.myMovies
                                })
                            })];
                    case 2:
                        response = _f.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        console.log("Movies successfully sent to the server.");
                        return [3 /*break*/, 5];
                    case 3:
                        _d = (_c = console).error;
                        _e = ["Failed to send movies:"];
                        return [4 /*yield*/, response.text()];
                    case 4:
                        _d.apply(_c, _e.concat([_f.sent()]));
                        _f.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _f.sent();
                        console.error("Error sending movies to the server:", error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return MovieApp;
}());
document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("movieContainer");
    if (!container) {
        console.error("Container not found!");
        return;
    }
    new MovieApp(container);
});
