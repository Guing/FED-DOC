"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/DataController");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['typescript-api'],
    maxAge: 24 * 60 * 60 * 10000
}));
app.use(router_1.default);
app.listen(8000, function () {
    console.log("server success!");
});
