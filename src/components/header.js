"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
class header extends HTMLElement {
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
exports.header = header;
customElements.define("header-comp", header);
