"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const state_1 = require("../state");
class Chat extends HTMLElement {
    connectedCallback() {
        const currentState = state_1.state.getState();
        this.render();
        const form = this.querySelector(".form");
        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const target = e.target;
            const message = target.message.value;
            if (currentState.nombre) {
                state_1.state.newMessage({
                    nombre: currentState.nombre,
                    message: message,
                    rtdbRoomId: currentState.rtdbRoomId,
                    local: true,
                });
            }
        });
    }
    render() {
        const style = document.createElement("style");
        const currenState = state_1.state.getState();
        console.log(currenState);
        this.innerHTML = `
   <div class="container">
    <header class="head"></header>
    <div class="roomid">RoomId:${currenState.roomId}</div>
    <messages-comp class="message-container" type="mysms"></messages-comp>
    </div>
    <form class="form">
      <input type="text" id="message"></input>
      <button class="button">Enviar</button>
    </form>
     
   
    `;
        style.innerHTML = `
  .root{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
.containerb{
    width: 100%;
    padding: 13px;
    display: flex;
    flex-direction: column;
}
  .head{
    width: 100vw;
    background-color: #FF8282;
    height: 60px;
  }
  .roomid{
    color:white;
  }
  .message-container{
    
  }
  .field{
    width: 100%;
    border:0px;
    padding:0px;
  }
  .input{
    width: 100%;
    border: 2px solid #000000;
    border-radius: 4px;
    height:30px;
    padding: 7px 0px 0 0;;
        
  }
  .principal{
   font-size:52px;
  }
  .secondary-Text{
    font-size:24px;
    font-weight: 400;
  }
  .button{
    width: 100%;
    height: 46px;
    font-family: 'Roboto', sans-serif;
    padding: 10px;
    background-color: #9CBBE9;
    border-radius: 14px;
    margin-top:10px;
}
.form{
    width: 100%;
    position: relative;
    bottom: 7px;
}
#message{
      width: 100%;
    color: white;
    border: solid 2px;
}
  `;
        this.classList.add("root");
        this.appendChild(style);
    }
}
exports.Chat = Chat;
customElements.define("chat-comp", Chat);
