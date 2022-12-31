import { graphql } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import Pagination from '../components/pagination'
import PostCard from '../components/postcard'
import BlogSidebar from '../components/blogsidebar'

const title = 'OpenShift Commons Blog'

const BlogIndex = ({ data, pageContext }) => {
  const posts = data.latestPosts.nodes

  return (
    <div className="max-w-screen-xl page-wrapper">
      <Seo title={title} />
      <h1 className="sr-only">{title}</h1>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="pb-8 md:pb-16">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-6 my-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination pageContext={pageContext} />
        </div>
        <aside className="w-full md:w-1/4 flex-shrink-0 md:border-l md:border-base-300 md:pl-4 py-4 pb-10 md:pb-16">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query allBlogMdxQuery($limit: Int!, $skip: Int!) {
    latestPosts: allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
      filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
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
              gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2.22, formats: [AUTO, WEBP])
            }
          }
        }
      }
    }
  }
`
