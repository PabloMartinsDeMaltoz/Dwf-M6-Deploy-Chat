import { Router } from "@vaadin/router";

export const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "form-comp" },
  { path: "/register", component: "register-comp" },
  { path: "/chat", component: "chat-comp" },
]);
