const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const query = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
          gatheringsPerPage
        }
      }

      gatherings: allMdx(
        sort: { order: DESC, fields: frontmatter___date }
        filter: {
          fileAbsolutePath: { regex: "/(/gatherings/)/" }
          frontmatter: { youtube_playlist_id: { regex: "/.*/" } }
        }
      ) {
        nodes {
          slug
        }
      }

      posts: allMdx(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
      ) {
        nodes {
          slug
        }
      }

      tags: allMdx(sort: { order: DESC, fields: frontmatter___tags }) {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `)

  // Check for any errors
  if (query.errors) {
    throw new Error(query.errors)
  }

  const posts = query.data.posts.nodes
  const tags = query.data.tags.group
  const gatherings = query.data.gatherings.nodes

  const blogIndexTemplate = path.resolve(`src/templates/blog.js`)
  const tagsTemplate = path.resolve(`src/templates/tag.js`)
  const gatheringIndexTemplate = path.resolve(`src/templates/gatherings.js`)

  // Create tag pages
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag.tag)}`,
      component: tagsTemplate,
      context: {
        tag: tag.tag,
      },
    })
  })

  // Create paginated posts pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: query.data.site.siteMetadata.postsPerPage,
    pathPrefix: '/blog', // Creates pages like `/blog`, `/blog/2`, etc
    component: blogIndexTemplate,
  })

  // Create paginated gatherings pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: gatherings, // An array of objects
    itemsPerPage: query.data.site.siteMetadata.gatheringsPerPage,
    pathPrefix: '/gatherings', // Creates pages like `/gatherings`, `/gatherings/2`, etc
    component: gatheringIndexTemplate,
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Define schema for frontmatter
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type MdxFrontmatter {
    title: String!
    description: String
    menu: String
    language: String
    date(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    timezone: String
    start_time: String
    end_time: String
    location: String
    venue: String
    venue_URL: String
    venue_address: String
    google_maps_URL: String
    registration_text: String
    registration_URL: String
    registration_text2: String
    registration_URL2: String
    registration_text3: String
    registration_URL3: String
    price: String
    sponsoring_URL: String
    sponsoring_text: String
    sponsors: [MdxFrontmatterSponsors]
    head_text: String
    lead_text: String
    info_text: String
    event_footer_text: String
    invite_link: String
    hidefromsearch: Boolean
    invite_a_friend: String
    schedule_leadin: String
    videos_text: String
    translate_overview: String
    translate_schedule: String
    translate_speakers: String
    translate_venue: String
    translate_where: String
    translate_when: String
    translate_price: String
    translate_invite: String
    translate_sponsors: String
    link: String
    link_text: String
    prev_link: String
    image: File
    alt: String
    videos: [MdxFrontmatterVideos]
  }

  type MdxFrontmatterSponsors {
    name: String
    label: String
    level: Int
    link: String
  }

  type MdxFrontmatterVideos {
    gathering_title: String
    gathering_date(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    gathering_videos: [MdxFrontmatterVideosGathering_videos]
  }

  type MdxFrontmatterVideosGathering_videos {
    publishedAt(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    channelId: String
    title: String
    description: String
    thumbnails: MdxFrontmatterVideosGathering_videosThumbnails
    channelTitle: String
    playlistId: String
    position: Int
    resourceId: MdxFrontmatterVideosGathering_videosResourceId
    videoOwnerChannelTitle: String
    videoOwnerChannelId: String
  }

  type MdxFrontmatterVideosGathering_videosThumbnails {
    default: MdxFrontmatterVideosGathering_videosThumbnailsDefault
    medium: MdxFrontmatterVideosGathering_videosThumbnailsMedium
    high: MdxFrontmatterVideosGathering_videosThumbnailsHigh
    standard: MdxFrontmatterVideosGathering_videosThumbnailsStandard
    maxres: MdxFrontmatterVideosGathering_videosThumbnailsMaxres
  }

  type MdxFrontmatterVideosGathering_videosThumbnailsDefault {
    url: String
    width: Int
    height: Int
  }

  type MdxFrontmatterVideosGathering_videosThumbnailsMedium {
    url: String
    width: Int
    height: Int
  }

  type MdxFrontmatterVideosGathering_videosThumbnailsHigh {
    url: String
    width: Int
    height: Int
  }

  type MdxFrontmatterVideosGathering_videosThumbnailsStandard {
    url: String
    width: Int
    height: Int
  }

  type MdxFrontmatterVideosGathering_videosThumbnailsMaxres {
    url: String
    width: Int
    height: Int
  }

  type MdxFrontmatterVideosGathering_videosResourceId {
    kind: String
    videoId: String
  }

  type SpeakersYaml implements Node {
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
    speaker_id: String
    name: String
    role: String
    company: String
    url: String
    intro: String
  }

  type HelloBarYaml implements Node {
    display: Boolean
    title: String
    end_date: Date
    background_color: String
    link_text: String
    link_url: String
  }
  `
  createTypes(typeDefs)
}
