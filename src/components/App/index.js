import BaseElement from '@components/Base'
import styleModule from 'css-loader!./app.css'
import { routeView } from '@/router'
import RouterLink from '@/router/Link'

export default class App extends BaseElement {
  constructor (mode = 'open') {
    super(mode)
    routeView(this.shadowRoot.querySelector('#route-view'))
  }

  depComponents () {
    RouterLink.register()
  }

  getTemplate () {
    return `
            <nav class="nav">
                <router-link to="/hello">首页</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/nested/menu1">nested</router-link>
                <router-link to="/abc">测试404</router-link>
            </nav>
            <div id="route-view" class="app-router"></div>
        `
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }

  connectedCallback () {
    console.log('App added to page.')
  }

  disconnectedCallback () {
    console.log('App removed from page.')
  }

  adoptedCallback () {
    console.log('App moved to new page.')
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log(`App attribute ${name} from ${oldValue} to ${newValue}`)
  }

  static tagName = 'app-main'
  static register () {
    const defined = customElements.get(App.tagName)
    if (!defined) customElements.define(App.tagName, this)
  }

  static mount (id) {
    App.register()
    const app = document.createElement(App.tagName)
    document.getElementById(id).appendChild(app)
  }
}
