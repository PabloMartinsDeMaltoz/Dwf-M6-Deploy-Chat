"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const state_1 = require("../state");
class Register extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        const style = document.createElement("style");
        this.innerHTML = `
    <div class="container">
      <title-comp>Registrate</title-comp>
       <div class="container-newUser">
          <form class="form-user">  
            <label class="text" for="email">Email</label> 
            <input class="input"  type="text" name="email" id="email">
            <label class="text" for="nombre">Nombre</label> 
            <input class="input" type="text" name="nombre" id="nombre">
            <button class="button">NewUser</button> 
         </form>  
       </div>   
   </div>
    `;
        style.innerHTML = `
    .container{
        padding: 30px;
    margin: 0px auto;
    max-width: 527px;
    display: flex;
    gap: 15px;
    flex-direction: column;
    color: white;
    }
    .text{
          font-family: 'Roboto', sans-serif;
          color: white;
    }
    .form-user{
     display:flex;
     flex-direction: column;
    }
  
    .input{
      color:white;
    }
    .button{
          background-color: white;
    color: black;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    margin-top:15px;
    }

    `;
        const formEl = document.querySelector(".form-user");
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const entries = Object.fromEntries(formData.entries());
            const values = entries;
            state_1.state.setEmailAndFullname({ nombre: values.nombre, email: values.email });
            state_1.state.newUser((err) => {
                if (err) {
                    console.error("Hubo un error con el ingreso de datos");
                }
            });
        });
        this.appendChild(style);
    }
}
exports.Register = Register;
customElements.define("register-comp", Register);
