import './src/styles/global.css'
require('prismjs/themes/prism-tomorrow.css')

// Set focus to top of the page after a route update. This is the
// expected behavior. Otherwise, screen readers will not announce
// the new page and the nav element clicked will still have focus
// (upsetting the designer).
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null && !location.hash) {
    const top = document.querySelector('#top')

    if (top) {
      top.focus()
    }
  }
}
