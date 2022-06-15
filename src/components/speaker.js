import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, StaticImage, getImage } from 'gatsby-plugin-image'

const Mugshot = ({ image, alt, innerClassName, ...other }) => {
  const mug = getImage(image)

  if (!mug) {
    return (
      <div {...other}>
        <StaticImage
          alt=""
          layout="fixed"
          height="175"
          aspectRatio="1"
          className={innerClassName}
          src="../images/person.png"
        />
      </div>
    )
  }

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={mug} alt={alt} />
    </div>
  )
}

const Speaker = ({ id, className, link = false }) => {
  const { allSpeakersYaml } = useStaticQuery(
    graphql`
      query {
        allSpeakersYaml {
          nodes {
            speaker_id
            name
            role
            company
            url
            intro
            photo {
              childImageSharp {
                gatsbyImageData(layout: FIXED, height: 175, aspectRatio: 1, formats: [AUTO, WEBP])
              }
            }
          }
        }
      }
    `,
  )

  const speaker = allSpeakersYaml.nodes.find((s) => s.speaker_id === id)

  if (!speaker) {
    return <></>
  }

  if (link) {
    return (
      <a
        className={`${className} underline text-primary-700 visited:text-primary-900 focus:ring-2 focus:ring-primary-600 hover:text-warning-700`}
        href={`#${encodeURIComponent(id)}`}
      >
        {speaker.name} ({speaker.company})
      </a>
    )
  }

  return (
    <a
      id={encodeURIComponent(id)}
      href={speaker.url}
      className="block p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <figure className="group flex flex-col items-center gap-4">
        <Mugshot
          className="w-[175px] rounded-full bg-primary-700 dark:bg-primary-100"
          innerClassName="rounded-full grayscale mix-blend-screen group-hover:grayscale-0 group-hover:mix-blend-normal group-focus:grayscale-0 group-focus:mix-blend-normal"
          image={speaker.photo}
          alt=""
        />
        <figcaption className="divide-y divide-solid">
          <p className="px-2 mb-2 text-center font-headings text-lg md:text-xl lg:text-2xl text-base-800">
            {speaker.name}
            <span className="block mt-2 md:mt-2 text-base">
              {speaker.role}
              <br />
              {speaker.company}
            </span>
          </p>
          {speaker.intro && (
            <details className="pt-2 marker:text-accent-500">
              <summary className="font-semibold">Intro</summary>
              {speaker.intro}
            </details>
          )}
        </figcaption>
      </figure>
    </a>
  )
}

export default Speaker
