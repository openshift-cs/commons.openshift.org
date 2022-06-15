const React = require('react')

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  let prod = process.env.GATSBY_BUILD_ENV === 'production'

  if (prod || pluginOptions.includeInDevelopment) {
    const scriptUrl =
      (prod ? pluginOptions.prodScriptUrl : pluginOptions.devScriptUrl) || ''

    setHeadComponents([
      <script
        key={`gatsby-plugin-adobe-dtm`}
        id="dpal"
        src={scriptUrl}
        async
      />,
    ])
  }
}
