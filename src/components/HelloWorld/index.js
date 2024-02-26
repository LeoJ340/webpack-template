import BaseElement from "../Base";
import styleModule from 'css-loader!./index.css'
import template from './index.hbs'

export default class HelloWorld extends BaseElement {
    constructor() {
        super();
    }
    data() {
        return {
            message: 'Hello World'
        }
    }
    getTemplate() {
        const data = this.data()
        return template(data)
    }
    getStyle() {
        const style = styleModule[0][1]
        return `<style>${style}</style>`
    }
    static register(tagName = 'test-container') {
        customElements.define(tagName, this);
        return tagName
    }
}
