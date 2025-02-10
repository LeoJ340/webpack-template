import { navigateTo } from '@/router'
import BaseElement from '@components/Base'
/**
 * router-link component
 */
export default class RouterLink extends BaseElement {
  static observedAttributes = ['to']
  constructor (mode = 'open') {
    super(mode)
    this.to = ''
  }

  getTemplate () {
    return '<a href="javascript:void(0)" class="router-link"><slot></slot></a>'
  }

  handleNavigation (event) {
    event.preventDefault()
    navigateTo(this.to)
  }

  connectedCallback () {
    this.shadowRoot.querySelectorAll('.router-link').forEach(link => {
      link.addEventListener('click', this.handleNavigation.bind(this))
    })
  }

  disconnectedCallback () {
    this.shadowRoot.querySelectorAll('.router-link').forEach(link => {
      link.removeEventListener('click', this.handleNavigation.bind(this))
    })
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'to') {
      this.to = newValue
    }
  }

  static tagName = 'router-link'
  static register () {
    const defined = customElements.get(RouterLink.tagName)
    if (!defined) customElements.define(RouterLink.tagName, this)
  }
}
