import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const LogoImage = ({ image, alt, innerClassName, ...other }) => {
  const logo = getImage(image)

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={logo} alt={alt} />
    </div>
  )
}

const OperatorsCarousel = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allOperatorsYaml {
            nodes {
              title
              logo {
                childImageSharp {
                  gatsbyImageData(layout: FIXED, height: 48, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className="dark:bg-base-700 relative overflow-hidden h-16 my-4 lg:my-8 before:absolute before:inset-0 before:pointer-events-none before:z-10 before:bg-fade-in-out dark:before:bg-dark-fade-in-out">
          <ul className="pl-4 absolute top-2 left-0 flex items-center gap-8 align-center whitespace-nowrap animate-slide-left hover-animate-pause will-change-transform transform-gpu">
            {data.allOperatorsYaml.nodes.map((op) => (
              <li key={op.title} className="inline-block">
                <LogoImage
                  image={op.logo}
                  alt={op.title}
                  innerClassName="object-contain w-36 h-full"
                />
              </li>
            ))}
            {data.allOperatorsYaml.nodes.map((op) => (
              <li aria-hidden="true" key={op.title} className="inline-block">
                <LogoImage
                  image={op.logo}
                  alt={op.title}
                  innerClassName="object-contain w-36 h-full"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  )
}

export default OperatorsCarousel
