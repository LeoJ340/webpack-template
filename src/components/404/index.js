import BaseElement from '@components/Base'
import styleModule from 'css-loader!./index.css'

export default class Page404 extends BaseElement {
  static tagName = 'page-404'
  constructor (mode = 'open') {
    super(mode)
  }

  getTemplate () {
    const message = 'Not Found'
    return `<h5 class="content">${message}</h5>`
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }
}
