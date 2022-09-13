export default class BaseElement extends HTMLElement {
    constructor(mode = 'open') {
        super();
        this.depComponents()
        this.attachShadow({mode});
        const template = this.getTemplate()
        const style = this.getStyle()
        this.shadowRoot.innerHTML = `${template}${style}`
    }
    // 依赖组件
    depComponents() {}
    // 组件数据
    data() {
        return {}
    }
    // 模板
    getTemplate() {
        return ''
    }
    // 样式
    getStyle() {
        return ''
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
        console.log(`Custom square element attribute ${name} from ${oldValue} to ${newValue}`);
    }
}