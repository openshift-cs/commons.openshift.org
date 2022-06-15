import React from 'react'
import Seo from '../components/seo'
import Callout from '../components/callout'
import { Calendar, Youtube, Twitter, Edit } from 'react-feather'
import { graphql, useStaticQuery } from 'gatsby'

export default function CommunityPage() {
  const headingStyle = 'font-headings text-3xl md:text-4xl lg:text-5xl text-base-800 mb-2 lg:mb-6'
  const paragraphStyle =
    'text-lg lg:text-xl text-base-600 pb-4 border-b border-base-300 lg:h-full max-w-[64ch]'

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            socialMedia {
              platform
              url
            }
          }
        }
      }
    `,
  )

  // There must be a better way of doing this. If so, send suggestion.
  const twitter = site.siteMetadata.socialMedia.filter((media) => media.platform === 'twitter')[0]
    .url

  return (
    <>
      <Seo title="Join Us" />
      <section className="light bg-primary-800 text-primary-200 flex flex-col justify-center items-center text-center min-h-[400px] px-4 md:px-6 py-4 md:py-0">
        <div className="space-y-6 max-w-[900px]">
          <h1 className="font-headings font-bold text-5xl md:text-6xl tracking-wide">
            Join OpenShift Commons
          </h1>
          <p className="text-lg lg:text-xl max-w-[64ch]">
            Commons builds connections and collaboration across OpenShift communities, projects and
            stakeholders. In doing so we'll enable the success of customers, users, partners, and
            contributors as we deepen our knowledge and experiences together.
          </p>
        </div>
      </section>
      <div className="z-0 py-12 lg:pt-32 md:pb-40 relative dark:before:opacity-60 dark:after:opacity-60 before:scale-x-[-1] before:z-[-1] before:bg-wave-pattern before:hue-rotate-[245deg] before:bg-no-repeat before:text-transparent before:w-full after:z-[-1] before:absolute before:h-full before:top-0 before:bg-left-top after:text-transparent after:bg-wave-pattern after:rotate-180 after:hue-rotate-[245deg] after:bg-no-repeat after:w-full after:z-[-1] after:absolute after:h-full after:top-0 after:bg-left-top after:scale-x-[-1]">
        <div className="absolute w-full top-0 left-0 h-full pointer-events-none z-[-1]" aria-hidden>
          <div
            style={{ bottom: '110px', left: '10vw' }}
            className="bg-alert-100 dark:hidden absolute rounded-full h-8 w-8"
          />
          <div
            style={{ bottom: '30px', right: '50%' }}
            className="bg-warning-100 dark:hidden absolute rounded-full h-12 w-12"
          />
          <div
            style={{ bottom: '80px', right: '10vw' }}
            className="bg-primary-100 dark:hidden absolute rounded-full h-14 w-14"
          />
        </div>

        <div className="grid lg:grid-cols-2 my-12 md:my-0 gap-8 page-wrapper">
          <div className="flex flex-col h-full">
            <h2 className={headingStyle}>Enrollment</h2>
            <p className={paragraphStyle}>
              Our goals go beyond code contributions. Commons is a place for companies using
              OpenShift to accelerate its success and adoption. To do this we'll act as resources
              for each other, share best practices and provide a forum for peer-to-peer
              communication.
            </p>
          </div>
          <div id="elq-iframe-signup-container" className="dark:bg-base-600 lg:order-3">
            <iframe
              className="w-full h-[720px] md:h-[500px] lg:h-[720px]"
              src="https://engage.redhat.com/opensource-commons-newsletter"
              scrolling="no"
              title="Enrollment Form"
            ></iframe>
          </div>
          <div className="mt-8 lg:mt-0 lg:order-2 flex flex-col h-full">
            <h2 className={headingStyle}>Contribute</h2>
            <p className={paragraphStyle}>
              Users, partners, customers, and contributors come together to collaborate and work
              together on OpenShift.
            </p>
          </div>
          <div className="flex flex-col gap-8 lg:order-4">
            <Callout
              className="lg:h-auto"
              title="Past Briefings"
              url="https://www.youtube.com/user/rhopenshift/playlists?flow=grid&view=1"
              icon={<Youtube alt="" />}
            >
              Check out our video library to learn about OpenShift&nbsp;topics.
            </Callout>
            <Callout
              className="lg:h-auto"
              title="Twitter"
              type="warning"
              url={twitter}
              icon={<Twitter alt="" />}
            >
              You can get blog and event announcements on Twitter as well as our
              other&nbsp;channels.
            </Callout>
            <Callout
              className="lg:h-auto"
              title="Blogs"
              url="mailto:community@stackrox.io?subject=Blog%20contribution&body=My%20blog%20topic%20is%20"
              icon={<Edit alt="" />}
            >
              Blogs are open for contribution. Is there a topic you are interested in? Let the
              organizers know about&nbsp;it. <strong>[needs review]</strong>
            </Callout>
            <Callout
              className="lg:h-auto"
              title="Join Great Sessions"
              type="warning"
              url="/events/"
              icon={<Calendar alt="" />}
            >
              Events are lead by an OpenShift expert who would love to answer any of your questions.
            </Callout>
          </div>
        </div>
      </div>
    </>
  )
}
