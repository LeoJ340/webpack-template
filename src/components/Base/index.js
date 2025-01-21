export default class BaseElement extends HTMLElement {
    constructor(mode = 'open') {
        super();
        this.depComponents()
        this.attachShadow({mode});
        const template = this.getTemplate()
        const style = this.getStyle()
        this.shadowRoot.innerHTML = `${style}${template}`
    }
    // 依赖组件
    depComponents() {}
    // 模板
    getTemplate() {
        return ''
    }
    // 样式
    getStyle() {
        return ''
    }
}
