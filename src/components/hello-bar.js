import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import WidowControl from './widow-control'
import { DateTime } from 'luxon'
import IconBox from './iconbox'
import { ArrowRightCircle } from 'react-feather'

const now = DateTime.now()

const HelloBar = () => (
  <StaticQuery
    query={graphql`
      {
        helloBarYaml(display: { eq: true }) {
          background_color
          end_date
          link_text
          link_url
          title
        }
      }
    `}
    render={({ helloBarYaml }) => {
      const { background_color, end_date, link_text, link_url, title } = helloBarYaml

      return (
        <>
          {helloBarYaml === null || DateTime.fromISO(end_date) < now ? (
            <></>
          ) : (
            <div
              className={`p-2 flex gap-6 items-center justify-between md:justify-center bg-${background_color}-300`}
            >
              <span className={`text-${background_color}-800`}>
                <WidowControl text={title} />
              </span>
              <IconBox
                className="hidden md:block !px-2 !py-1 !font-normal text-center"
                title={link_text}
                url={link_url}
              />
              <IconBox
                className="md:hidden"
                url={link_url}
                icon={<ArrowRightCircle alt="" />}
                titleText={link_text}
              />
            </div>
          )}
        </>
      )
    }}
  />
)

export default HelloBar
