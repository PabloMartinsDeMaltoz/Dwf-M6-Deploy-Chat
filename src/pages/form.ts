import { Router } from "@vaadin/router";
import { state } from "../state";

import { getUrlRtDB } from "../bdrt";
export class Form extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    this.innerHTML = `
    <header-comp></header-comp>
      <form class="form">
        <title-comp>Bienvenidos</title-comp>
        <input-comp type="nombre">Nombre</input-comp>
        <input-comp type="email">Email</input-comp>
        <div class="containerb">
         <label>Room</label>
         <select class="select" name="select">
          <option value="roomNuevo" selected>Nuevo room</option>
          <option value="roomExistente">Room existente</option>
         </select>
        </div>
        <input-comp id="id" type="id" class="roomidoff">Room id</input-comp>
        <button class="button">Comenzar</button>
        <button class="newUser">Crear cuenta</button>  
      </form>
        `;
    const cs = state.getState();
    const buttonNewUserEl = document.querySelector(".newUser");
    const selectel = document.querySelector(".select");
    const inputOpEl = document.querySelector(".roomidoff");

    buttonNewUserEl.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/register");
    });

    selectel.addEventListener("click", (e) => {
      const selectOption = e.target as any;
      console.log(selectOption.value);

      if (selectOption.value == "roomExistente") {
        inputOpEl.setAttribute("type", "id");
        inputOpEl.classList.replace("roomidoff", "roomidon");
      } else {
        inputOpEl.setAttribute("type", "none");
        inputOpEl.classList.replace("roomidon", "roomidoff");
      }
    });
    const formEl = document.querySelector(".form");

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      // console.log(e.target.elements.nombre);

      const form = e.target as any;
      const formData = new FormData(form);
      const entries = Object.fromEntries(formData.entries());
      const values = entries as any;
      console.log(values);
      state.setEmailAndFullname({
        nombre: values.nombre,
        email: values.email,
      });
      if (values.select == "roomNuevo") {
        state.signIn((err) => {
          if (err) {
            console.error("no se registro nombre y email");
          } else {
            state.askNewRoom(() => {
              getUrlRtDB();
              Router.go("/chat");
            });
          }
        });
      } else {
        state.signIn((err) => {
          if (err) {
            console.error("no se registro nombre y email");
          } else {
            console.log(values.id);

            cs.roomId = values.id;
            state.accessToRoom(() => {
              getUrlRtDB();
              Router.go("/chat");
            });
          }
        });
      }
    });

    style.innerHTML = `
   
   .form{
    padding: 30px;
    margin: 0px auto;
    max-width: 527px;
    display: flex;
    gap: 15px;
    flex-direction: column;
   }
   .containerb{
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: 'Roboto', sans-serif;
    color: white;
   }
   .roomidoff{
    display:none
   }
    .roomidoon{
    display:block;
   }
   .select{
    color:white;
   }
   .button{
    background-color: white;
    color: black;
    width: 100%;
    height: 30px;
    border-radius: 5px;
   }
   .newUser{
    background-color: white;
    color: black;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    
   }
   `;
    this.appendChild(style);
  }
}
customElements.define("form-comp", Form);
