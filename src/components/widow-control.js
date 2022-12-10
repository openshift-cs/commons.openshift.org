import React from 'react'

const WidowControl = ({ text }) => {
  return <>{text.replace(/ ([^ ]{1,10})$/, '\u00A0$1')}</>
}

export default WidowControl
