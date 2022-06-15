const prodPlugins = process.env.NODE_ENV === 'production' ? [] : []
const buildEnv = process.env.GATSBY_BUILD_ENV ? process.env.GATSBY_BUILD_ENV : process.env.NODE_ENV

module.exports = {
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: false,
  },
  siteMetadata: {
    title: `OpenShift Commons`,
    description: `Where users, partners, customers, and contributors come together to collaborate and work together on OpenShift.`,
    author: `OpenShift Community`,
    siteUrl: `https://commons.openshift.org`,
    image: `https://commons.openshift.org/images/OSC.jpg`,
    postsPerPage: 20,
    blog: `https://cloud.redhat.com/blog/tag/openshift-commons`,
    socialMedia: [
      {
        platform: `slack`,
        url: `https://openshiftcommons.slack.com/`,
        title: `Join us on Slack`,
      },
      {
        platform: `rss`,
        url: `https://cloud.redhat.com/blog/tag/openshift-commons/rss.xml`,
        title: `Subscribe to our blog feed`,
      },
      {
        platform: `twitter`,
        url: `https://twitter.com/openshiftcommon`,
        title: `Connect with us on Twitter`,
      },
      {
        platform: `github`,
        url: `https://github.com/openshift/origin-server`,
        title: `Check out our GitHub repository`,
      },
      {
        platform: `facebook`,
        url: `https://www.facebook.com/openshift`,
        title: `Visit us on Facebook`,
      },
    ],
  },
  plugins: [
    ...prodPlugins,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        resolveEnv: () => buildEnv,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: '/' }],
            sitemap: null,
            host: null,
          },
          production: {
            policy: [
              { userAgent: '*', allow: '/', disallow: ['/briefings/slides', '/gatherings/slides'] },
            ],
          },
        },
      },
    },
    //`gatsby-plugin-remove-fingerprints`, //Netlify recommends this for performance
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-adobe-launch`,
      options: {
        prodScriptUrl: `https://www.redhat.com/ma/dpal.js`,
        devScriptUrl: `https://www.redhat.com/ma/dpal-staging.js`,
        includeInDevelopment: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                })
              })
            },
            query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { fileAbsolutePath: { regex: "/gatherings/" } }
              ) {
                edges {
                  node {
                    fields { slug }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'OpenShift Commons Latest Blog Posts',
          },
        ],
      },
    },
    `gatsby-awesome-pagination`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `description`, `tags`, `content`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          Mdx: {
            title: (node) => node.frontmatter.title,
            slug: (node) => node.fields.slug,
            description: (node) => node.frontmatter.description,
            content: (node) => node.rawBody,
            hidefromsearch: (node) => node.frontmatter.hidefromsearch,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.hidefromsearch !== true,
      },
    },
    'gatsby-plugin-svgr',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
              icon: `<svg aria-hidden="true" version="1.1" viewBox="0 0 16 16" ><path fill="currentColor" fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: 'anchor',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2400,
              withWebp: true,
              loading: `lazy`,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noopener noreferrer`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false, //messes up when lines wrap
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gatherings`,
        path: `${__dirname}/src/content/gatherings`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `legal`,
        path: `${__dirname}/src/content/legal`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `operators`,
        path: `${__dirname}/src/content/operators`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `participants`,
        path: `${__dirname}/src/content/participants`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sponsors`,
        path: `${__dirname}/src/content/sponsors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `speakers`,
        path: `${__dirname}/src/content/speakers`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `videos`,
        path: `${__dirname}/src/content/videos`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://www.openshift.com/blog/tag/openshift-commons/rss.xml`,
        name: `commonsBlog`,
        parserOption: {
          headers: { Accept: 'text/xml,application/rss+xml' },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `OpenShift Commons`,
        short_name: `OpenShift Commons`,
        start_url: `/`,
        background_color: `#fff`, //`#663399`,
        theme_color: `#fff`, //`#663399`,
        display: `minimal-ui`,
        icon: `src/images/Icon-OSC-Red.svg`, // This path is relative to the root of the site.
      },
    },
  ],
}
