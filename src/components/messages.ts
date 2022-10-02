import { state } from "../state";

export class messages extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  type = this.getAttribute("type");

  connectedCallback() {
    this.render();
    state.subscribe(() => {
      const cs = state.getState();
      this.messages();
      this.render();
    });
  }
  messages() {
    const currentState = state.getState();
    const messageEl = document.createElement("div");
    messageEl.style.overflowY = "scroll";

    if (currentState.messages) {
      const user = JSON.parse(localStorage.getItem("data"));

      currentState.messages.map((m) => {
        if (m.from == user.nombre) {
          console.log(user, m.nombre);

          m.local = true;
        } else m.local = false;
        return m;
      });

      messageEl.innerHTML = `
        ${currentState.messages
          .map((m) => {
            return `
               <div class="container-message${m.local}">
                 <label class="user${m.local}">${m.from}</label>
                 <div class="root${m.local}">${m.message}</div>
               </div>
                      `;
          })
          .join("")}
        `;
      messageEl.scrollTop = messageEl.scrollHeight;
    }
    return messageEl;
  }
  render() {
    const style = document.createElement("style");
    const divEl = document.createElement("div");
    style.innerHTML = ` 
      .roottrue {
        padding: 11px;
        font-family: 'Roboto';
        border-radius: 9px;
        margin: 0px 12px 12px 10px;
        color: white;
        background-color: cadetblue;
      }
       .rootfalse {
        padding: 11px;
        font-family: 'Roboto';
        border-radius: 9px;
        margin: 0px 12px 12px 10px;
        color: white;
        background-color: black;
      }
      .container{
        height: 84vh;
        width: 100%;
        border: 1px solid #ddd;
        overflow-y: scroll;
      }
      .container-messagetrue{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .container-messagefalse{
        display: flex;
        flex-direction: column;
            align-items: flex-start;
      }
      .usertrue{
         color: #8e8e8e;
         margin: 0px 12px;
         font-size: 18px;
      }
      .userfalse{
         color: #8e8e8e;
         margin: 0px 12px;
         font-size: 18px;
      }
    `;
    //divEl.classList.add("container-message");

    /*
    divEl.style.overflowX = "hidden";
    divEl.style.overflowY = "scroll";
    divEl.style.height = "80vh";  
   */
    this.classList.add("rooot");
    const messageEl = this.messages();
    divEl.appendChild(messageEl);
    if (this.shadow.firstChild) {
      this.shadow.firstChild.remove();
      this.shadow.lastChild?.remove();
      console.log("remove");
    }
    this.shadow.appendChild(divEl);
    this.shadow.appendChild(style);
    divEl.style.height = "80vh";
    divEl.style.overflowY = "scroll";
    divEl.scrollTop = divEl.scrollHeight;
  }
}
customElements.define("messages-comp", messages);
