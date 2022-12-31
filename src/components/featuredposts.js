import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

const FeaturedPosts = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          featuredPosts: allMdx(
            sort: { order: DESC, fields: frontmatter___date }
            filter: { frontmatter: { featured: { eq: true } } }
            limit: 7
          ) {
            nodes {
              id
              slug
              frontmatter {
                title
              }
            }
          }
        }
      `}
      render={(data) => (
        <ul>
          {data.featuredPosts.nodes.map((post) => (
            <li key={post.id}>
              <Link
                activeClassName="!from-base-100 !to-secondary-300 !dark:border-base-500 !border-secondary-500 text-secondary-800 dark:text-primary-900 dark:from-base-0 dark:to-primary-400"
                className="flex mb-4 rounded border-2 font-semibold border-primary-300 dark:border-base-300 hover:ring-2 hover:ring-primary-600 focus:ring-2 focus:ring-primary-600 bg-gradient-to-br from-base-100 to-primary-200 dark:from-base-0 dark:to-base-100 px-2 py-3 text-sm"
                to={`/blog/${post.slug}`}
              >
                <span className="line-clamp-3">{post.frontmatter.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  )
}

export default FeaturedPosts
