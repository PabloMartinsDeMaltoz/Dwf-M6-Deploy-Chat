export class Title extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    const text = this.innerText;
    this.innerHTML = `
    <h1 class="title">${text}<h1>
    `;

    style.innerHTML = `
    .title{
      font-family: 'Roboto', sans-serif;
      font-weight:700;
      font-size:40px;
      color:white;
    }
    `;
    this.appendChild(style);
  }
}
customElements.define("title-comp", Title);
