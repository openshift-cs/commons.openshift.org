import React from 'react'
import { Link } from 'gatsby'
import DateString from './date-string'

const PostCard = ({ post, icon }) => {
  const url = `/gatherings/${post.slug}`
  const date = DateString({ date: post.frontmatter.date, struct: true })

  return (
    <div>
      <Link
        to={url}
        className="shadow-post hover:shadow-post-hover relative flex flex-col gap-4 bg-base-100 h-full p-4 group rounded-lg focus:ring-2 focus:ring-primary-400"
      >
        <div className="z-10 flex flex-row gap-4">
          <h2 className="order-2 shrink font-headings font-bold text-lg md:text-2xl tracking-wide group-hover:text-primary-700">
            {post.frontmatter.title}
          </h2>

          <p className="order-1 relative mr-8 flex flex-row text-center leading-none font-bold">
            <span className="flex flex-col">
              <span className="text-primary-600 text-sm">{date.dow}</span>
              <span className="text-accent-700 text-4xl leading-snug">{date.day}</span>
              <span className="text-base-900 text-lg leading-[0.8]">{date.month}</span>
            </span>
            <span className="absolute top-0 right-0 origin-top-right -rotate-90 text-base-400 text-3xl">
              {date.year}&nbsp;
            </span>
          </p>
        </div>
        <p>{post.frontmatter.description ? post.frontmatter.description : post.excerpt}</p>
        {icon && (
          <span
            aria-hidden="true"
            className="absolute z-0 top-4 right-4 h-20 w-20 ml-1 text-accent-100 dark:text-secondary-200"
          >
            {icon}
          </span>
        )}
      </Link>
    </div>
  )
}

export default PostCard
