export class Inputs extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const text = this.innerText;
    const style = document.createElement("style");
    const type = this.getAttribute("type");
    this.innerHTML = `
    
    <div class="root">
      <label  class="text">${text}</label>
      <input name="${type}" class="text" type=text></input>
    </div>
    
    `;
    style.innerHTML = `
    .root {
    color: white;
    display: flex;
    flex-direction: column;
    }
   .text{
    font-family: 'Roboto', sans-serif;
        color: white;
    }  
    `;
    this.appendChild(style);
  }
}
customElements.define("input-comp", Inputs);
