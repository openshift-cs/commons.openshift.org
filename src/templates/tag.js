import { graphql } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import Pagination from '../components/pagination'
import PostCard from '../components/postcard'

const Tag = ({ data, pageContext }) => {
  const posts = data.allMdxByTag.nodes
  const { tag } = pageContext

  return (
    <div className="max-w-screen-xl page-wrapper">
      <Seo title={`Posts under ${tag}`} />
      <h1 className="my-6 font-headings font-bold text-2xl lg:text-3xl tracking-wide">
        Posts under <mark className="capitalize italic">{tag}</mark>
      </h1>

      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} condensed={true} />
        })}
      </div>
      <Pagination pageContext={pageContext} />
    </div>
  )
}

export default Tag

export const pageQuery = graphql`
  query ($tag: [String]) {
    allMdxByTag: allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { tags: { in: $tag } } }
    ) {
      nodes {
        id
        slug
        excerpt
        frontmatter {
          date(formatString: "MMM D, YYYY")
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                aspectRatio: 2.22
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`
