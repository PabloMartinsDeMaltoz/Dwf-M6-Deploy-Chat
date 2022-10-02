import { router } from "./router";
import { getUrlRtDB } from "./bdrt";
import { Router } from "@vaadin/router";

const URL_BASE = "http://localhost:3000";
const state = {
  data: {
    nombre: "",
    email: "",
    userId: "",
    rtdbRoomId: "",
    roomId: "",
    messages: [],
  },
  listeners: [],

  init(callback) {
    const cs = state.getState();
    callback();
  },

  getState() {
    return this.data;
  },
  setState(newData) {
    let currentState = state.getState();
    currentState = newData;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("data", JSON.stringify(newData));
  },
  setEmailAndFullname(params: { nombre: string; email: string }) {
    const cs = this.getState();
    const email = params.email;
    cs.nombre = params.nombre;
    cs.email = email;
    this.setState(cs);
  },
  newUser(err) {
    const cs = state.getState();
    if (cs.email && cs.nombre) {
      fetch(URL_BASE + "/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cs),
      })
        .then((res) => {
          return res.json();
        })
        .then((r) => {
          if (r.message !== "user already exist") {
            cs.userId = r.id;
            state.setState(cs);
            console.log(cs);
            Router.go("/");
          } else {
            alert("Usuario existente");
          }
        });
    } else {
      err(true);
    }
  },
  signIn(err) {
    const cs = this.getState();
    if (cs.email) {
      fetch(URL_BASE + "/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cs),
      })
        .then((res) => {
          return res.json(); // acordarse de retornar la promesa con return
        })
        .then((r) => {
          cs.userId = r.userId;
          this.setState(cs);
          err();
        });
    } else {
      console.error("no existe ese email");
      err();
    }
  },
  askNewRoom(callback) {
    const cs = this.getState();
    if (cs.userId) {
      fetch(URL_BASE + "/rooms", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cs),
      })
        .then((res) => {
          return res.json();
        })
        .then((r) => {
          cs.roomId = r.roomIdShort;
          cs.rtdbRoomId = r.roomLongId;
          this.setState(cs);
          callback();
        });
    }
  },
  accessToRoom(callback) {
    const cs = state.getState();
    console.log(cs);

    if (cs.roomId) {
      fetch(URL_BASE + "/rooms/" + cs.roomId + "?userId=" + cs.userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);

          return res.json();
        })
        .then((r) => {
          console.log(r.data);
          cs.rtdbRoomId = r.realTimeDataBaseId;
          console.log(cs);

          callback();
        });
    }
  },
  newMessage(message) {
    console.log(message);

    const cs = this.getState();
    fetch(URL_BASE + "/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  },
  subscribe(callback: any) {
    this.listeners.push(callback);
  },
};
export { state };
