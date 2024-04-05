import BaseElement from "../Base";
import styleModule from 'css-loader!./index.css'
import template from './index.hbs'

export default class HelloWorld extends BaseElement {
    constructor() {
        super('open');
    }
    data() {
        return {
            message: 'Hello World',
            homeImg: require('@/assets/home.jpg')
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
    static register(tagName = 'hello-world') {
        customElements.define(tagName, this);
        return tagName
    }
}
