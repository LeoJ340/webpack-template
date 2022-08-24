import styleModule from 'css-loader!./app.css'

export default class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `${this.getBody()}${this.getStyle()}`
    }
    getBody() {
        return `<div class="app">
                    <img src="${require('../../assets/home.jpg')}" alt="">
                    <h3>Welcome to Your Web App!</h3>
                </div>`
    }
    getStyle() {
        const style = styleModule[0][1]
        return `<style>${style}</style>`
    }
    static register(tagName = 'app-container') {
        customElements.define(tagName, App);
        return tagName
    }
    static mount() {
        const tagName = App.register()
        const app = document.createElement(tagName);
        document.body.appendChild(app)
    }
    connectedCallback() {
        console.log('Custom square element added to page.');
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
    }
}