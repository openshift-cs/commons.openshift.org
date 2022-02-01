import React from 'react'

/*
 * Output a scalable wirefram SVG image placeholder.
 */

const Placeholder = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      stroke="gray"
      stroke-width="1"
    >
      <polygon points="0,0 100,100 0,100 100,0 100,100 0,100 0,0 100,0" />
    </svg>
  )
}

export default Placeholder
