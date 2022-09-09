import styleModule from 'css-loader!./app.css'
import template from './app.hbs'

export default class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `${this.getTemplate()}${this.getStyle()}`
    }
    getTemplate() {
        const homeImg = require('../../assets/home.jpg')
        return template({homeImg})
    }
    getStyle() {
        const style = styleModule[0][1]
        return `<style>${style}</style>`
    }
    static register(tagName = 'app-container') {
        customElements.define(tagName, App);
        return tagName
    }
    static mount(id) {
        const tagName = App.register()
        const app = document.createElement(tagName);
        document.getElementById(id).appendChild(app)
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