"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router_1 = require("@vaadin/router");
exports.router = new router_1.Router(document.querySelector(".root"));
exports.router.setRoutes([
    { path: "/", component: "form-comp" },
    { path: "/register", component: "register-comp" },
    { path: "/chat", component: "chat-comp" },
]);
