import BaseElement from "../Base";
import styleModule from 'css-loader!./app.css'
import template from './app.hbs'
import HelloWorld from "../HelloWorld";

/**
 * 新巴士小巴司机还行把手机号先把数据相比
 * 我想八十八
 */
// 我想八十八
export default class App extends BaseElement {
    constructor(mode = 'open') {
        super(mode);
    }
    depComponents() {
        HelloWorld.register()
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
        customElements.define(tagName, this);
        return tagName
    }
    static mount(id) {
        const tagName = this.register()
        const app = document.createElement(tagName);
        document.getElementById(id).appendChild(app)
    }
}
