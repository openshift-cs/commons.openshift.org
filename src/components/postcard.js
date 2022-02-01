import React from 'react'
import { Link } from 'gatsby'
import DateString from './date-string'

const PostCard = ({ post, icon }) => {
  const url = `/gatherings/${post.slug}`

  return (
    <div>
      <Link
        to={url}
        className="shadow-post hover:shadow-post-hover flex flex-col bg-base-100 h-full p-4 group rounded-lg focus:ring-2 focus:ring-primary-400"
      >
        <p className="flex justify-between border-b border-base-300 py-3 text-base-500 font-bold">
          <DateString date={post.frontmatter.date} />
          {icon && (
            <span aria-hidden="true" className="h-6 w-6 ml-1">
              {icon}
            </span>
          )}
        </p>

        <h2 className="my-2 font-headings font-bold text-lg tracking-wide group-hover:text-primary-700">
          {post.frontmatter.title}
        </h2>
        <p>
          {post.frontmatter.description
            ? post.frontmatter.description
            : post.excerpt}
        </p>
      </Link>
    </div>
  )
}

export default PostCard
