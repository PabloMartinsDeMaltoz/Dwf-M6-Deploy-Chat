// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
import { listenerCount } from "process";
import { state } from "./state";
import map from "lodash/map";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA44RAtYBJ9wzD4qbKkESLhVm30AK53gjI",
  authDomain: "dwf-m6-4c327.firebaseapp.com",
  databaseURL: "https://dwf-m6-4c327-default-rtdb.firebaseio.com",
  projectId: "dwf-m6-4c327",
  storageBucket: "dwf-m6-4c327.appspot.com",
  messagingSenderId: "210395432081",
  appId: "1:210395432081:web:b679a725e502ce3370eb30",
  measurementId: "G-EH9Z2KV46G",
};

const app = initializeApp(firebaseConfig);
const DbRt = getDatabase();

/*
export function listener() {
  console.log(currentState);
  const refRoom = ref(DbRt, currentState.rtdbRoomId);
  onValue(refRoom, (snapshot) => {
    console.log(snapshot.val());
    return snapshot.val();
  });
}*/

export function getUrlRtDB() {
  const currentState = state.getState();
  if (currentState.rtdbRoomId) {
    const url = "/rooms/" + currentState.rtdbRoomId;
    const refRoom = ref(DbRt, url);

    return onValue(refRoom, (snapshot) => {
      const messageFromServer = snapshot.val();
      if (messageFromServer[0]) {
        currentState.messages = map(messageFromServer[0].messages);
        state.setState(currentState);
        console.log(currentState, "listen EVENT");
      } else console.log("message esta vacio");
    });
  } else {
    console.error("no tenes el id");
  }
}

/* console.log(roomEventListen);

  return roomEventListen;
*/

/*
export const roomEventListen = onValue(refRoom, (snapshot) => {
  console.log(snapshot.val());
  return snapshot.val();
});
*/
