import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Vid = ({ title, desc, id }) => {
  return (
    <div>
      <h2 className="my-2 font-headings font-bold text-lg tracking-wide md:min-h-[5.25rem] md:line-clamp-3">
        {title}
      </h2>
      <div className="video-embed mb-8">
        <iframe
          title="YouTube Video"
          src={`https://www.youtube.com/embed/${id}?rel=0`}
          frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p className="break-words">{desc}</p>
    </div>
  )
}

const Videos = ({ title }) => {
  const { videosYaml } = useStaticQuery(
    graphql`
      query {
        videosYaml {
          videos {
            gathering_title
            gathering_videos {
              title
              description
              resourceId {
                videoId
              }
            }
          }
        }
      }
    `,
  )

  const videos = videosYaml.videos.find((v) => v.gathering_title === title)

  return (
    <>
      {videos?.gathering_videos.map((vid) => (
        <Vid
          key={vid.resourceId.videoId}
          title={vid.title}
          desc={vid.description}
          id={vid.resourceId.videoId}
        />
      ))}
    </>
  )
}

export default Videos
