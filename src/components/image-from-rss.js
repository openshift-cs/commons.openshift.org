// Look for an image in the most poorly formatted RSS feed I have ever seen.
import React from 'react'
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image'

const ImageFromRSS = ({ content, innerClassName, ...other }) => {
  const imgRe = /<img\s.*?src="(.*?)"/m
  const src = content.match(imgRe)[1]
  const image = ''
  const hero = getImage(image)
  //<GatsbyImage className={innerClassName} image={hero} alt="" />

  console.log(`src = "${src}"`)

  if (!src || src.indexOf('track.hubspot.com') !== -1) {
    return (
      <div {...other}>
        <StaticImage
          alt=""
          layout="fullWidth"
          aspectRatio="2.22"
          className={innerClassName}
          src="../images/OSC-OG.jpg"
        />
      </div>
    )
  }

  return (
    <div {...other}>
      <img src={src} alt="" className={innerClassName} />
    </div>
  )
}

export default ImageFromRSS
