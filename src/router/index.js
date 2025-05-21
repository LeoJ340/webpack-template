import Page404 from '@components/404'
import HelloWorld from '@components/HelloWorld'
import About from '@components/About'
import Nested from '@components/nested'
import Menu1 from '@components/nested/menu1'

const routes = [
  { path: 'hello', component: HelloWorld },
  { path: 'about', component: About },
  {
    path: 'nested',
    component: Nested,
    children: [
      {
        path: 'menu1',
        component: Menu1
      }
    ]
  }
]

/**
 * router mode
 * The mode variable with possible values 'hash' or 'history'.
 * TODO：history 模式待实现
 */
const mode = 'hash'

let routerMatcher = []
let routeEnd = false
export function routeView (shadow) {
  if (routeEnd) return
  if (mode === 'hash') {
    window.addEventListener('hashchange', () => handleRouteChange(shadow))
  } else {
    window.onpopstate = () => handleRouteChange(shadow)
  }
  matcher(shadow) // load initial route
}

function matcher (shadow) {
  const path = mode === 'hash' ? location.hash.slice(1) : location.pathname
  if (!path || path === '/') return
  if (!routerMatcher.length) {
    routerMatcher = findRoute(path, routes)
  }
  const component = routerMatcher.shift().component
  if (!routerMatcher.length) {
    routeEnd = true
  }
  loadComponent(component, shadow)
}

function handleRouteChange (shadow) {
  routeEnd = false
  routerMatcher = []
  matcher(shadow)
}

function findRoute (path, routes) {
  const paths = path.split('/').filter(Boolean)
  const matchedRoutes = []

  function find (routes, remainingPaths) {
    const currentPath = remainingPaths[0]
    const currentRoute = routes.find(r => r.path === currentPath)

    if (currentRoute) {
      matchedRoutes.push(currentRoute)
      if (remainingPaths.length > 1 && currentRoute.children?.length) {
        find(currentRoute.children, remainingPaths.slice(1))
      }
    } else {
      matchedRoutes.push({ component: Page404 })
    }
  }

  find(routes, paths)
  return matchedRoutes.length ? matchedRoutes : []
}

function loadComponent (component, shadow) {
  const tagName = registerComponent(component)
  const element = document.createElement(tagName)
  shadow.innerHTML = '' // Clear previous content
  shadow.appendChild(element)
}

function registerComponent (component) {
  if (!component.tagName) throw new Error('missing Required parameter tagName')
  const defined = customElements.get(component.tagName)
  if (!defined) {
    customElements.define(component.tagName, component)
  }
  return component.tagName
}

export function navigateTo (path) {
  if (mode === 'hash') {
    location.hash = path
  } else {
    // TODO：调用history.pushState()方法后，不会触发popstate事件
    history.pushState(null, null, path)
  }
}
