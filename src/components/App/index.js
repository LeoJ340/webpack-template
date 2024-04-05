import BaseElement from "@components/Base";
import styleModule from 'css-loader!./app.css'
import template from './app.hbs'
import HelloWorld from "@components/HelloWorld";

export default class App extends BaseElement {
    constructor(mode = 'open') {
        super(mode);
    }
    depComponents() {
        HelloWorld.register()
    }
    getTemplate() {
        return template()
    }
    getStyle() {
        const style = styleModule[0][1]
        return `<style>${style}</style>`
    }
    static register(tagName = 'app-container') {
        customElements.define(tagName, this);
        return tagName
    }
    static mount(id) {
        const tagName = this.register()
        const app = document.createElement(tagName);
        document.getElementById(id).appendChild(app)
    }
}
