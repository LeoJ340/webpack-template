import BaseElement from '@components/Base'
import styleModule from 'css-loader!./index.css'

export default class About extends BaseElement {
  static tagName = 'about-page'
  constructor (mode = 'open') {
    super(mode)
  }

  getTemplate () {
    const message = 'About Page'
    return `<h5>${message}</h5>`
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }
}
