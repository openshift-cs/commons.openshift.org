exports.onRouteUpdate = ({ location, prevLocation }, pluginOptions) => {
  if (
    process.env.NODE_ENV === 'production' ||
    pluginOptions.includeInDevelopment
  ) {
    if (
      typeof window._satellite !== 'undefined' &&
      typeof window._satellite.pageBottom === 'function'
    ) {
      // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
      // reactHelmet is using requestAnimationFrame: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299
      setTimeout(() => {
        //console.log(
        //  'Route updated: New pathname =',
        //  location.pathname,
        //  'Old pathname =',
        //  prevLocation ? prevLocation.pathname : null,
        //)

        // If this is an initial page, use _satellite, else use sendCustomEvent. Why? Dunno, but
        // _satellite is ignored on subsequent pages and sendCustomEvent causes two beacons to fire
        // on initial pages. Thus, this.
        if (prevLocation) {
          // Not an initial page view.
          window.sendCustomEvent('pageBottom')
        } else {
          // Initial page.
          window._satellite.pageBottom()
        }
      }, 32)
    }
  }

  // If this is not an initial page view, call the third-party time.ly script
  // (if it exists on this page).
}
