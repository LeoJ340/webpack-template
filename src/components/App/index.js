import BaseElement from "@components/Base";
import styleModule from 'css-loader!./app.css'
import HelloWorld from "@components/HelloWorld";

export default class App extends BaseElement {
    constructor(mode = 'open') {
        super(mode);
    }
    depComponents() {
        HelloWorld.register()
    }
    getTemplate() {
        return '<hello-world></hello-world>'
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
    connectedCallback() {
        console.log('App added to page.');
    }
    disconnectedCallback() {
        console.log('App removed from page.');
    }
    adoptedCallback() {
        console.log('App moved to new page.');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`App attribute ${name} from ${oldValue} to ${newValue}`);
    }
}
