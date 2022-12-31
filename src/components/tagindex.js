import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link, graphql, StaticQuery } from 'gatsby'

const TagIndex = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          tagIndex: allMdx(sort: { order: DESC, fields: frontmatter___tags }) {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `}
      render={(data) => (
        <ul className="col-count-2 md:col-count-1 space-y-4 gap-x-6">
          {data.tagIndex.group.map((tag) => (
            <li className="hover:text-primary-600 hover:underline font-medium" key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  )
}

export default TagIndex
