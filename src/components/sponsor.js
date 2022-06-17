import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const LogoImage = ({ image, innerClassName }) => {
  if (image?.extension === 'svg')
    return (
      <div>
        <img className="" width="150" src={image.publicURL} alt="" />
      </div>
    )

  const logo = getImage(image)

  return <GatsbyImage className={innerClassName} image={logo} alt="" />
}

const Sponsor = ({ name }) => {
  const { p, s } = useStaticQuery(
    graphql`
      query {
        p: allParticipantsYaml {
          nodes {
            name
            link
            logo {
              childImageSharp {
                gatsbyImageData(width: 150, formats: [AUTO, WEBP])
              }
              extension
              publicURL
            }
          }
        }

        s: allSponsorsYaml {
          nodes {
            name
            link
            logo {
              childImageSharp {
                gatsbyImageData(width: 150, formats: [AUTO, WEBP])
              }
              extension
              publicURL
            }
          }
        }
      }
    `,
  )

  const aStyle =
    'block p-4 rounded-md dark:bg-base-400 hover:ring-2 hover: ring-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400'

  const imgStyle = 'max-w-[500px]'

  // Sponsors can also be participants, use that data first, if found.
  const participant = p.nodes.find((obj) => obj.name === name)

  if (participant) {
    return (
      <a className={aStyle} target="_blank" rel="noopener noreferrer" href={participant.link}>
        <LogoImage innerClassName={imgStyle} image={participant.logo} alt={name} />
      </a>
    )
  }

  const sponsor = s.nodes.find((obj) => obj.name === name)

  if (sponsor) {
    return (
      <a className={aStyle} target="_blank" rel="noopener noreferrer" href={sponsor.link}>
        <LogoImage className={imgStyle} image={sponsor.logo} alt={name} />
      </a>
    )
  }

  return <p>Sponsor {name} not found.</p>
}

export default Sponsor
