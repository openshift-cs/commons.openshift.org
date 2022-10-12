import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const LogoImage = ({ image, alt, innerClassName, ...other }) => {
  if (image?.extension === 'svg')
    return (
      <div>
        <img className="max-h-9" width="108" height="36" src={image.publicURL} alt={alt} />
      </div>
    )

  const logo = getImage(image)

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={logo} alt={alt} />
    </div>
  )
}

const ParticipantsCarousel = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allParticipantsYaml(filter: { archived: { ne: true } }) {
            nodes {
              name
              logo {
                childImageSharp {
                  gatsbyImageData(layout: FIXED, height: 36, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className="dark:bg-base-700 relative overflow-hidden w-full h-[352px] my-8 lg:my-16 before:absolute before:inset-0 before:pointer-events-none before:z-10 before:bg-fade-in-out dark:before:bg-dark-fade-in-out">
          <ul className="pl-4 absolute top-2 left-0 w-[10000px] flex flex-wrap items-center gap-6 align-center whitespace-nowrap animate-slide-left hover-animate-pause will-change-transform transform-gpu">
            {data.allParticipantsYaml.nodes.map((op) => (
              <li key={op.name} className="inline-block">
                <LogoImage
                  image={op.logo}
                  alt={op.name}
                  innerClassName="object-contain w-[108px] h-full"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  )
}

export default ParticipantsCarousel
