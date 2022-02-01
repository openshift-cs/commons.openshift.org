import React from 'react'
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image'

const HeroImage = ({ image, innerClassName, ...other }) => {
  const hero = getImage(image)

  if (!hero) {
    return (
      <div {...other}>
        <StaticImage
          alt=""
          layout="fullWidth"
          aspectRatio="2.22"
          className={innerClassName}
          src="../images/stackrox-community.jpg"
        />
      </div>
    )
  }

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={hero} alt="" />
    </div>
  )
}

export default HeroImage
