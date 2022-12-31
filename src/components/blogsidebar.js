import React from 'react'
import FeaturedPosts from '../components/featuredposts'
import TagIndex from '../components/tagindex'
import IconBox from '../components/iconbox'
import { Rss } from 'react-feather'
import { useStaticQuery, graphql } from 'gatsby'
//import Subscribe from '../components/subscribe'

const BlogSidebar = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            socialMedia {
              platform
              url
              title
            }
          }
        }
      }
    `,
  )

  const rss = site.siteMetadata.socialMedia.filter((media) => media.platform === 'rss')[0].url

  return (
    <>
      {/* <Subscribe / > */}
      <hr className="mb-12 border border-base-300 md:hidden" />
      <div className="mt-2 mb-8 block md:hidden xl:block">
        <IconBox flex title="Subscribe to our blog" url={rss} icon={<Rss />} />
      </div>
      <div className="mt-2 mb-8 hidden md:block xl:hidden">
        <IconBox flex title="Subscribe" url={rss} icon={<Rss />} />
      </div>
      <div className="mb-8">
        <h2 className="my-4 border-b border-base-300 pb-2 text-xl md:text-base lg:text-lg font-semibold">
          Featured Posts
        </h2>
        <FeaturedPosts />
      </div>
      <div className="mb-8 md:sticky md:top-32">
        <h2 className="my-4 border-b border-base-300 pb-2 text-xl md:text-base font-semibold lg:text-lg">
          Filter by Topic
        </h2>
        <TagIndex />
      </div>
    </>
  )
}

export default BlogSidebar
