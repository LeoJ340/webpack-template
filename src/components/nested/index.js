import BaseElement from '@components/Base'
import styleModule from 'css-loader!./index.css'
import { routeView } from '@/router'

export default class Nested extends BaseElement {
  static tagName = 'nested-page'
  constructor (mode = 'open') {
    super(mode)
    routeView(this.shadowRoot.querySelector('#route-view'), true)
  }

  getTemplate () {
    return `
        <div class="nested">Nested</div>
        <div id="route-view" class="nested-router"></div>
    `
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }
}
