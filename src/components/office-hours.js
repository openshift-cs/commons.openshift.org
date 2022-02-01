import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import IconBox from './iconbox'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
const { DateTime } = require('luxon')

const OfficeHours = () => {
  const DateTimeString = ({ date, time }) => {
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      zone: 'America/Los_Angeles',
    }
    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }
    const d = DateTime.fromISO(date + 'T' + time, {
      zone: 'America/Los_Angeles',
    })

    return (
      <span>
        <span className="md:hidden lg:inline xl:hidden">Date: </span>
        <span>{d.toLocaleString(dateOptions)} </span>
        <span className="hidden md:inline lg:hidden xl:inline">at</span>
        <span className="block md:inline lg:block xl:inline">
          <span className="md:hidden lg:inline xl:hidden">Time: </span>{' '}
          {d.toLocaleString(timeOptions)} /{' '}
          {d.setZone('America/New_York').toLocaleString(timeOptions)}
        </span>
      </span>
    )
  }

  const UTCDateTimeString = (date, time, length, msFormat) => {
    let d = DateTime.fromISO(date + 'T' + time)

    if (length) {
      d = d.plus({ hours: 1 })
    }

    return msFormat
      ? d.toUTC().toFormat('y-LL-dd') +
          'T' +
          d.toUTC().toFormat('HH:mm:ss') +
          ';00:00'
      : d.toUTC().toFormat('yLLdd') + 'T' + d.toUTC().toFormat('HHmmss') + 'Z'
  }

  return (
    <StaticQuery
      query={graphql`
        {
          mdx(fileAbsolutePath: { regex: "/office-hours/index.mdx/" }) {
            frontmatter {
              title
              link
              link_text
              prev_link
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 1028
                    height: 537
                    formats: [AUTO, WEBP]
                  )
                }
              }
              alt
              date
              time
            }
            body
          }
        }
      `}
      render={(data) => (
        <div className="office-hours grid mt-10 md:mt-16 md:mb-8 p-4 xl:px-7 lg:py-12 xl:py-16 lg:mb-24 grid-cols-1 gap-4 xl:gap-6 lg:grid-cols-2 grid-flow-row bg-tertiary-100 dark:bg-base-100 w-full rounded-2xl border-2 border-base-400">
          <div className="flex flex-col justify-center">
            <h3 className="inline-flex flex-col font-headings text-xl md:text-2xl break-words lg:text-3xl xl:text-4xl text-base-800 mb-2 space-y-2 lg:mb-3 !leading-tight">
              <span>{data.mdx.frontmatter.title}</span>
            </h3>
            <p className="text-base text-base-600 font-semibold md:text-lg lg:text-lg xl:text-xl mb-4 xl:mb-6 border-b-2 border-base-400 pb-4 xl:pb-6">
              <DateTimeString
                date={data.mdx.frontmatter.date}
                time={data.mdx.frontmatter.time}
              />
            </p>
            <div className="font-medium">
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </div>

            <div className="mt-4 flex space-x-2 md:space-x-4">
              <IconBox
                title={data.mdx.frontmatter.link_text}
                url="/office-hours.ics"
                icon=""
              />

              <IconBox
                title="Previous Office Hours"
                url={data.mdx.frontmatter.prev_link}
              />
            </div>
            <p className="mt-2">
              <a
                className="underline hover:text-secondary-600 dark:hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600 dark:focus:ring-secondary-600"
                href={
                  'https://outlook.live.com/calendar/0/deeplink/compose?body=Join%20our%20StackRox%20Office%20Hours%20at%201%3A00%20pm%20PT%20%2F%204%3A00%20pm%20ET%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&enddt=' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    1,
                    true,
                  ) +
                  '&location=' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    0,
                    true,
                  ) +
                  '&subject=StackRox%20Office%20Hours%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.title)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Outlook.com
              </a>{' '}
              |{' '}
              <a
                className="underline hover:text-secondary-600 dark:hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600 dark:focus:ring-secondary-600"
                href={
                  'https://outlook.office.com/calendar/0/deeplink/compose?body=Join%20our%20StackRox%20Office%20Hours%20at%201%3A00%20pm%20PT%20%2F%204%3A00%20pm%20ET%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&enddt=' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    1,
                    true,
                  ) +
                  '&location=' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    0,
                    true,
                  ) +
                  '&subject=StackRox%20Office%20Hours%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.title)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Office 365
              </a>{' '}
              |{' '}
              <a
                className="underline hover:text-secondary-600 dark:hover:text-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-600 dark:focus:ring-secondary-600"
                href={
                  'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    0,
                    false,
                  ) +
                  '%2F' +
                  UTCDateTimeString(
                    data.mdx.frontmatter.date,
                    data.mdx.frontmatter.time,
                    1,
                    false,
                  ) +
                  '&details=Join%20our%20StackRox%20Office%20Hours%20at%201%3A00%20pm%20PT%20%2F%204%3A00%20pm%20ET%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&location=' +
                  encodeURIComponent(data.mdx.frontmatter.link) +
                  '&text=StackRox%20Office%20Hours%3A%20' +
                  encodeURIComponent(data.mdx.frontmatter.title)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Google
              </a>
            </p>
          </div>
          <div className="hidden lg:flex w-full">
            <GatsbyImage
              image={getImage(data.mdx.frontmatter.image)}
              alt=""
              objectPosition="-24px 0"
              imgClassName="rounded-2xl border-8 border-tertiary-400 dark:border-tertiary-300 before:text-transparent before:absolute before:pointer-events-none before:pointer-events-none before:z-[1] before:w-full before:h-full before:shadow-image before:rounded-xl"
              className="hidden lg:flex w-full object-cover relative overflow-hidden"
            />
            <p className="sr-only">{data.mdx.frontmatter.alt}</p>
          </div>
        </div>
      )}
    />
  )
}

export default OfficeHours
