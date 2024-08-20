import React from 'react'
import Seo from '../components/seo'
import Callout from '../components/callout'
import { Info, Navigation } from 'react-feather'
import { graphql, useStaticQuery } from 'gatsby'


export default function CommunityPage() {
  const headingStyle = 'font-headings text-3xl md:text-4xl lg:text-5xl text-base-800 mb-2 lg:mb-6'
  const paragraphStyle = 'text-lg lg:text-xl text-base-600 pb-4 border-b border-base-300 lg:h-full max-w-[64ch]'
  const ctaStyle = 'text-center text-2xl lg:text-3xl text-base-600 lg:leading-relaxed'

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
      <section className=" z-0 py-12 md:pt-32 md:pb-40 lg:pt-40 relative dark:after:opacity-60 after:z-[-1] after:text-transparent after:bg-low-poly after:rotate-180 after:bg-no-repeat after:w-full after:absolute after:h-full after:top-0 after:bg-left-bottom after:opacity-60 before:opacity-60 before:transform before:z-[-1] before:bg-low-poly before:bg-no-repeat before:text-transparent before:w-full before:absolute before:h-full before:top-0 before:bg-left-bottom overflow-hidden">
        <div className="flex flex-col items-center page-wrapper">
          <h2 className={headingStyle}>Become a part of something bigger</h2>
          <p className={`${paragraphStyle} mt-6 text-center md:max-w-[64ch]`}>
            OpenShift Commons is open to all community participants: users, operators, enterprises,
            non-profits, educational institutions, partners, and service providers as well as other
            open source technology initiatives utilized under the hood or to extend community
            projects.
          </p>
          <ul className="mt-6 mb-4 list-disc ml-4 text-lg md:max-w-[64ch]">
            <li className={`${paragraphStyle} mb-4`}>
              If you are a Kubernetes or OpenShift customer or have deployed Kubernetes or OpenShift
              on premise or on a public cloud.
            </li>
            <li className={`${paragraphStyle} mb-4`}>
              If you have contributed to community projects and want to connect with your peers and
              end users.
            </li>
            <li className={`${paragraphStyle} mb-4`}>
              If you simply want to stay up-to-date on the roadmap and best practices for using,
              deploying and operating OpenShift.
            </li>
          </ul>
          <p className={ctaStyle}>Then OpenShift Commons is the right place for&nbsp;you.</p>
        </div>
        <div
          className="absolute w-full hidden md:flex top-0 left-0 h-full pointer-events-none z-[-1]"
          aria-hidden
        >
          <div
            style={{ top: '180px', left: '15vw' }}
            className="bg-tertiary-100 dark:hidden absolute rounded-full h-10 w-10"
          />

          <div
            style={{ top: '32px', right: '15vw' }}
            className="bg-caution-100 dark:hidden absolute rounded-full h-12 w-12"
          />

          <div
            style={{ bottom: '50px', right: '8vw' }}
            className="bg-warning-100 dark:hidden absolute rounded-full h-12 w-12"
          />

          <div
            style={{ bottom: '140px', left: '10vw' }}
            className="bg-alert-100 dark:hidden absolute rounded-full h-10 w-10"
          />
          <div
            style={{ bottom: '100px', left: '55%' }}
            className="bg-primary-100 dark:hidden absolute rounded-full h-14 w-14"
          />
        </div>
      </section>

      <div className="z-0 py-12 md:pt-32 md:pb-40 lg:pt-40 relative before:absolute before:bg-hero-waves dark:before:opacity-60 dark:after:opacity-60 before:scale-x-[-1] before:z-[-1] before:bg-wave-pattern before:hue-rotate-[245deg] before:bg-no-repeat before:text-transparent before:w-full after:z-[-1] before:absolute before:h-full before:top-0 before:bg-left-top relative dark:after:opacity-60 after:z-[-1] after:text-transparent after:bg-wave-pattern after:rotate-180 after:hue-rotate-[245deg] after:bg-no-repeat after:w-full after:z-[-1] after:absolute after:h-full after:top-0 after:bg-left-top after:scale-x-[-1]">
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
            <h2 className={headingStyle}>Virtural Gatherings</h2>
            <p className={paragraphStyle}>
              Our goals go beyond code contributions. Commons is a place for companies using
              OpenShift to accelerate its success and adoption. To do this we'll act as resources
              for each other, share best practices and provide a forum for peer-to-peer
              communication.
            </p>
            &nbsp;
            <h2 className={headingStyle}>Submit to Speak</h2>
            <p className={paragraphStyle}>
              Interested in sharing your own insight with the OpenShift Commons? Please fill out and submit the <b><a href="https://red.ht/commons-general-speaking">Following Forum.</a></b> 
            </p>
          </div>
        
          <div className="flex flex-col gap-20 lg:order-4">
            <Callout
              className="lg:h-auto"
              title="OpenShift Commons General Virtual Meeting"
              url="https://red.ht/commons-general"
              icon={< Navigation alt="" />}
            >
              <b>Every Wednesday at 12:00PM EST - 9:00AM&nbsp;PT</b>.
            </Callout>
            <Callout
              className="lg:h-auto"
              title="OpenShift Commons General Agenda"
              url="http://red.ht/commons-GENERAL-agenda"
              icon={< Info alt="" />}
            >
               Interested in joining a Virtual Gathering? Review our upcoming Gatherings&nbsp;here.
            </Callout>
          </div>
        </div>
      </div>
    </>
  )
}
