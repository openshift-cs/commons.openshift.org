const path = require('path')
const fse = require('fs-extra')
const { paginate } = require('gatsby-awesome-pagination')
const { DateTime } = require('luxon')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const query = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }

      posts: allMdx(
        sort: { order: DESC, fields: frontmatter___date }
        filter: {
          fileAbsolutePath: { regex: "/gatherings/" }
          frontmatter: { youtube_playlist_id: { regex: "/.*/" } }
        }
      ) {
        nodes {
          slug
        }
      }

      officeHours: mdx(
        fileAbsolutePath: { regex: "/office-hours/index.mdx/" }
      ) {
        frontmatter {
          title
          date
          time
          link
        }
      }
    }
  `)

  // Check for any errors
  if (query.errors) {
    throw new Error(query.errors)
  }

  const posts = query.data.posts.nodes

  const gatheringIndexTemplate = path.resolve(`src/templates/gatherings.js`)

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: query.data.site.siteMetadata.postsPerPage,
    pathPrefix: '/gatherings', // Creates pages like `/gatherings`, `/gatherings/2`, etc
    component: gatheringIndexTemplate,
  })

  // Create ical file for Office Hours event.
  const now = DateTime.now()
  const nowStr =
    now.toUTC().toFormat('yLLdd') + 'T' + now.toUTC().toFormat('HHmmss') + 'Z'
  let d = DateTime.fromISO(
    query.data.officeHours.frontmatter.date +
      'T' +
      query.data.officeHours.frontmatter.time,
  )
  const dtstart = d.toISO({ format: 'basic' }).substring(0, 15)
  const dtend = d.plus({ hours: 1 }).toISO({ format: 'basic' }).substring(0, 15)
  const link = query.data.officeHours.frontmatter.link
  const iCal = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:America/Los_Angeles
TZURL:http://tzurl.org/zoneinfo-outlook/America/Los_Angeles
X-LIC-LOCATION:America/Los_Angeles
BEGIN:DAYLIGHT
TZOFFSETFROM:-0800
TZOFFSETTO:-0700
TZNAME:PDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
TZNAME:PST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:${nowStr}
UID:${now.toMillis()}@stackrox.io
DTSTART;TZID=America/Los_Angeles:${dtstart}
DTEND;TZID=America/Los_Angeles:${dtend}
SUMMARY:StackRox Office Hours: ${query.data.officeHours.frontmatter.title}
DESCRIPTION:Join our StackRox Office Hours at 1:00 pm PT / 4:00 pm ET: ${link}
LOCATION:${link}
END:VEVENT
END:VCALENDAR`
  await fse.writeFile('./public/office-hours.ics', iCal)
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
    time: String
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

  `
  createTypes(typeDefs)
}
