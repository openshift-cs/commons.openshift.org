import React from 'react'

const WidowControl = ({ text }) => {
  return <>{text.replace(/ ([^ ]{1,10})$/, '&nbsp;$1')}</>
}

export default WidowControl
