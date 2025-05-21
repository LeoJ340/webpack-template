import BaseElement from '../Base'
import styleModule from 'css-loader!./index.css'

export default class HelloWorld extends BaseElement {
  static tagName = 'hello-world'
  constructor () {
    super('open')
    const btn = document.createElement('button')
    btn.innerText = 'Click Me!'
    btn.addEventListener('click', () => {
      const count = this.shadowRoot.getElementById('count')
      count.innerText = parseInt(count.innerText) + 1
    })
    this.shadowRoot.appendChild(btn)
    const count = document.createElement('div')
    count.innerText = '0'
    count.id = 'count'
    this.shadowRoot.appendChild(count)
  }

  getStyle () {
    const style = styleModule[0][1]
    return `<style>${style}</style>`
  }

  getTemplate () {
    const message = 'Welcome to Your Web App!'
    const homeImg = require('@/assets/home.jpg')
    return `
            <img src="${homeImg}" alt="">
            <h3>${message}</h3>
        `
  }
}
