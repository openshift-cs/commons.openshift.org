import React from 'react'
import kebabCase from 'lodash/kebabCase'
import { Link } from 'gatsby'

const Tags = ({ tags }) => {
  return (
    <ul className="flex space-x-2">
      {tags.map((tag) => (
        <li className="flex space-x-2" key={tag}>
          <Link
            className="rounded px-3 py-1 border-2 font-bold text-sm border-primary-300 hover:border-primary-400 bg-primary-200 capitalize hover:bg-primary-200 hover:text-primary-700"
            to={`/tags/${kebabCase(tag)}/`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Tags
