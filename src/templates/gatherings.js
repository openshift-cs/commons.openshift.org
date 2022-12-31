import { graphql } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import Pagination from '../components/pagination'
import PostCard from '../components/gatheringcard'
import { DateTime } from 'luxon'
import { Film } from 'react-feather'

const title = 'Gatherings'
const headingStyle =
  'text-center font-headings text-2xl md:text-3xl lg:text-4xl text-base-800 my-4 lg:my-8'

const today = DateTime.now().startOf('day')

const GatheringIndex = ({ data, pageContext }) => {
  const gatherings = data.gatheringsList.nodes

  return (
    <div className="max-w-screen-xl page-wrapper">
      <Seo title={title} />
      <h1 className="sr-only">{title}</h1>

      <div className="pb-8 md:pb-16">
        {pageContext.pageNumber === 0 && (
          <>
            <h2 className={headingStyle}>Upcoming Gatherings</h2>
            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 my-6">
              {gatherings
                .filter(
                  (gathering) =>
                    DateTime.fromISO(gathering.frontmatter.date).startOf('day') >= today,
                )
                .map((gathering) => {
                  return <PostCard key={gathering.id} post={gathering} />
                })}
            </div>
          </>
        )}
        <h2 id="videos" className={`${headingStyle} mt-8 lg:mt-16`}>
          Past Gatherings Videos
        </h2>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          {gatherings
            .filter(
              (gathering) =>
                DateTime.fromISO(gathering.frontmatter.date).startOf('day') < today &&
                gathering.frontmatter.youtube_playlist_id,
            )
            .map((gathering) => (
              <PostCard key={gathering.id} post={gathering} icon={<Film alt="" />} />
            ))}
        </div>
        <Pagination pageContext={pageContext} />
      </div>
    </div>
  )
}

export default GatheringIndex

export const pageQuery = graphql`
  query allMdxQuery($limit: Int!, $skip: Int!) {
    gatheringsList: allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/(/gatherings/)/" } }
    ) {
      nodes {
        id
        slug
        excerpt
        frontmatter {
          date
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2.22, formats: [AUTO, WEBP])
            }
          }
          youtube_playlist_id
        }
      }
    }
  }
`
