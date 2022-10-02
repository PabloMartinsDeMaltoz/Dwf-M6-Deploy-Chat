import { state } from "./state";
import { getUrlRtDB } from "./bdrt";
import "./router";
import "./pages/register";
import "./pages/chat";
import "./pages/form";
import "./components/header";
import "./components/title";
import "./components/input";
import "./components/messages";

//import { roomEventListen } from "./bdrt";

(function () {
  state.init(() => {}); /*
  state.setEmailAndFullname({ email: "martinsdev@live.com", nombre: "pablo" });

   esto sucede en el submit del form de la primera pantall
  state.signIn((err) => {
    if (err) console.error("hubo un error");
    state.askNewRoom(() => {
      getUrlRtDB();
    });
  });
})();

 Propuesta:
 al comenzar (para evitar la primera pantalla)
 state.init()
 recupera el state del localStorage
 const cs = state.getState()
 if(cs.rtdbRoomId && cs.userId){
   Router.push("/chat")
 }
*/
})();
