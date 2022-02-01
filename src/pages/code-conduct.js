import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Seo from '../components/seo'

export default function CodeConductPage({ data }) {
  const {
    body,
    frontmatter: { title },
  } = data.mdx

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Seo title={title} />
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="border border-base-400 rounded-lg p-6">
          <div className="flex flex-col mb-6 space-y-4">
            <h1 className="font-medium text-4xl font-headings leading-tight">
              {title}
            </h1>
          </div>

          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query Conduct {
    mdx(fileAbsolutePath: { regex: "/legal/index_code_of_conduct.mdx/" }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
