import BaseElement from '@components/Base'
import styleModule from 'css-loader!./index.css'
import { routeView } from '@/router'

export default class Menu1 extends BaseElement {
  static tagName = 'menu1-page'
  constructor (mode = 'open') {
    super(mode)
    routeView(this.shadowRoot.querySelector('#route-view'), true)
  }

  getTemplate () {
    return `
        <div class="menu1">menu1</div>
        <div id="route-view" class="menu1-router"></div>
    `
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }
}
