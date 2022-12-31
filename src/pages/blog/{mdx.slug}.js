import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Seo from '../../components/seo'
import HeroImage from '../../components/hero-image'
import Tags from '../../components/tags'
import BlogSidebar from '../../components/blogsidebar'
import ShareButtons from '../../components/sharebuttons'

export default function PostPage({ data, ...props }) {
  const {
    body,
    frontmatter: { title, date, description, image, tags },
  } = data.mdx
  const url = props.location.href

  return (
    <div className="!max-w-screen-lg page-wrapper">
      <Seo title={title} description={description} image={image} article={true} />
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-3/4 flex-shrink-0 my-6 pb-8 md:pb-16">
          <HeroImage
            innerClassName="rounded-md before:text-transparent before:absolute before:pointer-events-none before:pointer-events-none before:z-[1] before:w-full before:h-full before:shadow-image before:rounded-md relative rounded-md"
            image={image}
          />
          <div className="flex justify-between border-b border-base-300 py-4 text-base-500">
            <p className="font-bold">{date}</p>
            <ShareButtons title={title} url={url} twitterHandle="konveyor_io" tags={tags} />
          </div>
          <div className="flex flex-col mb-12 space-y-4">
            <h1 className="mt-6 font-medium text-3xl md:text-4xl font-headings !leading-snug">
              {title}
            </h1>
            {tags !== null && (
              <div className="flex w-full items-center space-x-2">
                <h2>Tags:</h2>

                <Tags tags={tags} />
              </div>
            )}
          </div>

          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <aside className="md:w-1/4 flex-shrink-0 md:border-l md:border-base-300 md:pl-4 pt-4 pb-10 md:pb-20">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  )
}

export const query = graphql`
  query PostBySlug($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      frontmatter {
        date(formatString: "MMM D, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2.22, formats: [AUTO, WEBP])
          }
        }
      }
    }
  }
`
