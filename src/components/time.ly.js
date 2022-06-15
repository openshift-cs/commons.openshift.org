// Embed time.ly calendar, which isn't as simple as one would think with React.

import React from 'react'
import InnerHTML from 'dangerously-set-html-content'

const TimeLyCalendar = ({ acct, lang }) => {
  return (
    <InnerHTML
      html={`<script src="https://calendar.time.ly/embed.js" data-src="https://calendar.time.ly/${acct}/month${
        lang ? '?lang=es-ES' : ''
      }" data-max-height="0" id="timely_script"></script>`}
    />
  )
}

export default TimeLyCalendar
