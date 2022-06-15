import React from 'react'
import {
  Facebook,
  GitHub,
  Rss,
  Slack,
  Twitch,
  Twitter,
  Youtube,
} from 'react-feather'
import { useStaticQuery, graphql } from 'gatsby'

const SocialMediaIcons = () => {
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
  const SocialMediaIcon = ({ ...props }) => {
    const { platform, url, title } = props
    const iconClass = 'h-7 w-7 p-1 text-base-400 dark:text-primary-700'

    const selectedPlatform = (platform) => {
      switch (platform) {
        case 'slack':
          return <Slack alt="Slack" className={iconClass} />

        case 'github':
          return <GitHub alt="GitHub" className={iconClass} />

        case 'rss':
          return <Rss alt="RSS" className={iconClass} />

        case 'twitter':
          return <Twitter alt="Twitter" className={iconClass} />

        case 'youtube':
          return <Youtube alt="YouTube" className={iconClass} />

        case 'twitch':
          return <Twitch alt="Twitch" className={iconClass} />

        case 'facebook':
          return <Facebook alt="Facebook" className={iconClass} />

        default:
          alert('Add missing icon:', platform)
      }
    }

    return (
      <a
        className="flex items-center rounded hover:bg-base-800 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-base-800 dark:focus:ring-base-500 justify-center"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        title={title}
      >
        {selectedPlatform(platform)} <span className="sr-only">{title}</span>
      </a>
    )
  }
  return (
    <ul className="flex space-x-4 md:space-x-6 lg:justify-center">
      {site.siteMetadata.socialMedia.map((socialSite) => (
        <li key={socialSite.platform}>
          <SocialMediaIcon
            platform={socialSite.platform}
            url={socialSite.url}
            title={socialSite.title}
          />
        </li>
      ))}
    </ul>
  )
}

export default SocialMediaIcons
