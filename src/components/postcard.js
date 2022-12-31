import React from 'react'
import { Link } from 'gatsby'
import HeroImage from './hero-image'

const PostCard = ({ post, condensed }) => {
  const url = `/blog/${post.slug}`

  return (
    <div className={condensed ? '' : 'md:first:col-span-2'}>
      <Link
        to={url}
        className="shadow-post hover:shadow-post-hover flex flex-col bg-base-100 h-full p-4 group rounded-lg focus:ring-2 focus:ring-primary-400"
      >
        <HeroImage
          className="before:text-transparent before:absolute before:pointer-events-none before:z-[1] before:w-full before:h-full before:shadow-image before:rounded-md relative rounded-md overflow-hidden"
          image={post.frontmatter.image}
        />
        <p className="flex justify-between border-b border-base-300 py-3 text-base-500 font-bold">
          {post.frontmatter.date}
        </p>
        <h2 className="my-2 font-headings font-bold text-lg tracking-wide group-hover:text-primary-700">
          {post.frontmatter.title}
        </h2>
        {condensed !== true && (
          <p className="line-clamp-3">
            {post.frontmatter.description
              ? post.frontmatter.description
              : post.excerpt}
          </p>
        )}
      </Link>
    </div>
  )
}

export default PostCard
