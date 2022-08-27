// Embed Dynamic Form script, which isn't as simple as one would think with React.

import React from 'react'
import InnerHTML from 'dangerously-set-html-content'

const DynamicForm = () => {
  return (
    <InnerHTML
      html={`<script src="https://www.redhat.com/libraries/dyfo-client/dist/main.js"></script><div class="rh-dyfo" data-rh-dyfo-instance="009ba970-dc8d-4ad9-96ea-d7aa10acc2b6"></div>`}
    />
  )
}

export default DynamicForm
