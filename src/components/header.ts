export class header extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");

    this.innerHTML = `
    <div class="header"></div>    
    `;

    style.innerHTML = `
    .header{
        height: 60px;;
        background:#FF8282;
    }
    `;
    this.appendChild(style);
  }
}

customElements.define("header-comp", header);
