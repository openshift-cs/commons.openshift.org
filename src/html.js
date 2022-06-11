import React from 'react'

export default function HTML(props) {
  return (
    <html className="light" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' *; script-src 'self' 'unsafe-inline' 'unsafe-eval' calendar.time.ly www.redhat.com static.redhat.com assets.adobedtm.com dpm.demdex.net; font-src 'self' data:; img-src data: *; style-src 'self' 'unsafe-inline'; frame-src 'self' engage.redhat.com www.youtube.com www.google.com"
        ></meta>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
