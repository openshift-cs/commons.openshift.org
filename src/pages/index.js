import { graphql, Link } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import ParticipantsCarousel from '../components/participants-carousel'
import { ArrowRight, ChevronsRight, Edit, FileText } from 'react-feather'
import { ReactComponent as Slack } from '../images/slack-icon.svg'
import { ReactComponent as HomeBanner } from '../images/OpenShiftCommons.svg'
import { StaticImage } from 'gatsby-plugin-image'
import IconBox from '../components/iconbox'

export default function IndexPage({ data }) {
  const headingStyle = 'font-headings text-3xl lg:text-5xl text-base-800 text-center mb-2 lg:mb-4'
  const paragraphStyle = 'text-lg lg:text-xl text-base-600 lg:leading-relaxed'
  const ctaStyle = 'text-center text-2xl lg:text-3xl text-base-600 lg:leading-relaxed'

  const blog = data.site.siteMetadata.blog
  const slack = data.site.siteMetadata.socialMedia.filter((media) => media.platform === 'slack')[0]
    .url

  const CallToAction = ({ title, url, last }) => {
    return (
      <div
        style={{
          marginBottom: last ? '15px' : '0px',
          boxShadow: '10px 15px 0px 0px hsla(var(--tertiary-400), .4)',
        }}
        className="flex w-full rounded-lg"
      >
        <Link
          target={url.indexOf('https://') === 0 || url.indexOf('www.') === 0 ? '_blank' : '_self'}
          className="light flex-shrink-0 w-full inline-flex flex-row space-x-8 text-base-700 hover:text-tertiary-700 items-center justify-between rounded-lg border-2 border-base-100 dark:border-primary-100 px-2 md:tracking-tight lg:tracking-tight lg:px-4 py-6 xl:py-8 bg-gradient-to-br from-tertiary-200 to-success-200 hover:from-tertiary-300 hover:to-success-300 focus:from-tertiary-300 focus:to-success-300 dark:from-base-300 dark:to-tertiary-300 dark:hover:from-base-400 dark:hover:to-tertiary-400 dark:focus:from-base-400 dark:focus:to-tertiary-400 text-xl lg:text-2xl xl:text-3xl font-bold xl:font-semibold focus:outline-none focus:ring-2 focus:ring-primary-600"
          rel="noopener noreferrer"
          to={url}
        >
          {title}
          <span className="flex-shrink-0 rounded-full w-10 h-10 lg:h-14 lg:w-14 flex px-2 py-2 bg-base-100 text-tertiary-700 leading-none">
            <ArrowRight />
          </span>
        </Link>
      </div>
    )
  }

  const CommonsGathering = () => (
    <StaticImage
      src="../images/commons-gathering.png"
      alt="A Commons briefing presentation"
      className="h-full rounded-lg"
    />
  )
  const CommonsResources = () => (
    <StaticImage
      src="../images/commons-resources.png"
      alt="A Commons office hours event"
      className="h-full rounded-lg"
    />
  )

  const mosaicImgStyle = 'relative rounded-lg border-2 border-base-100'
  const mosaicImgOverlay =
    'opacity-70 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:text-base-500 after:text-transparent after:bg-diagonal-lines after:bg-repeat after:opacity-40'

  return (
    <div className="overflow-hidden">
      <Seo />
      <section className="overflow-hidden border-b border-base-300 relative before:absolute before:bg-hero-waves before:hue-rotate-[330deg] before:pointer-events-none before:hidden lg:before:flex before:text-transparent before:w-full before:h-full before:bg-left-bottom before:bg-repeat-x">
        <div className="page-wrapper flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center py-8 md:py-16 lg:pb-24 xl:pt-24 xl:pb-44">
          <div className="max-w-[55ch] lg:max-w-none lg:w-1/2 flex-grow-0">
            <h1 className="font-headings font-bold text-4xl lg:text-5xl xl:text-6xl">
              <small className="block text-primary-600 dark:text-base-400 lg:mb-2 text-xl lg:text-2xl xl:text-3xl">
                We have more in common than you know
              </small>
              <span className="text-base-800 dark:text-base-700">OpenShift Commons</span>
            </h1>
            <p className={`${paragraphStyle} my-6 lg:my-8`}>
              To provide a platform where users, partners, customers, and contributors come together to collaborate, learn, share knowledge and work together on any topics related to OpenShift.
            </p>
            <div className="flex flex-wrap gap-3">
              <IconBox title="Join us on Slack" url={slack} icon={<Slack alt="" />} />
              <IconBox title="Join our community" url="/virtualgatherings/" icon={<Edit alt="" />} />
            </div>
          </div>
          <div className="max-w-md w-full">
            <HomeBanner
              alt="OpenShift Commons is your library of OpenShift knowledge"
              className="banner lg:absolute lg:top-0 lg:w-auto"
            />
          </div>
        </div>
      </section>
      <section className="z-0 py-12 md:pt-32 md:pb-40 lg:pt-40 relative dark:after:opacity-60 after:z-[-1] after:text-transparent after:bg-wave-pattern after:rotate-180 after:hue-rotate-[245deg] after:bg-no-repeat after:w-full after:z-[-1] after:absolute after:h-full after:top-0 after:bg-left-top after:scale-x-[-1]">
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

      <section className="get-involved z-0 relative bg-base-700 dark:bg-base-100 py-16 lg:pt-24 lg:pb-40 after:z-[-1] after:text-transparent after:bg-low-poly after:rotate-180 after:bg-no-repeat after:w-full after:absolute after:h-full after:top-0 after:bg-left-bottom after:opacity-60 before:opacity-60 before:transform before:z-[-1] before:bg-low-poly before:bg-no-repeat before:text-transparent before:w-full before:absolute before:h-full before:top-0 before:bg-left-bottom overflow-hidden">
        <h2 className="font-headings text-3xl lg:text-5xl text-base-100 dark:text-base-900 text-center mb-8 md:mb-20">
          Get involved
        </h2>
        <div className="flex flex-col space-y-12 md:flex-row md:space-y-0 md:space-x-8 page-wrapper">
          <div className="md:w-1/2 xl:w-2/5 flex flex-col space-y-12 justify-between">
            <CallToAction url={slack} title="Join us on Slack" />
            <CallToAction
              url="https://red.ht/commons-meeting-recordings"
              title="Check out past Briefings"
            />
            <CallToAction last url="https://okd.io" title="Collaborate with the community" />
          </div>
          <div className="light md:w-3/5 grid grid-cols-6 gap-3 lg:gap-4 rounded-lg p-3 lg:p-4 bg-tertiary-400 bg-opacity-40">
            <div className={`col-span-3 ${mosaicImgStyle} ${mosaicImgOverlay}`}>
              <CommonsGathering />
            </div>
            <div className={`col-span-3 ${mosaicImgStyle} ${mosaicImgOverlay}`}>
              <CommonsResources />
            </div>
          </div>
        </div>
      </section>
      <section className="z-0 px-4 pt-32 pb-12 min-h-[600px] relative dark:before:opacity-60 before:scale-x-[-1] before:z-[-1] before:bg-wave-pattern before:hue-rotate-[245deg] before:bg-no-repeat before:text-transparent before:w-full before:absolute before:h-full before:top-0 before:bg-left-top">
        <div className="flex flex-col items-center">
          <p className="text-5xl">Commons Participants</p>
          <ParticipantsCarousel />
          <p className={paragraphStyle}>
            <IconBox
              title="View the full participant list"
              url="/participants/"
              icon={<ChevronsRight />}
              right="1"
            />
          </p>

          <div
            className="absolute w-full hidden md:flex top-0 left-0 h-full pointer-events-none z-[-1]"
            aria-hidden
          >
            <div
              style={{ top: '80px', left: '20vw' }}
              className="bg-tertiary-100 dark:hidden absolute rounded-full h-10 w-10"
            />

            <div
              style={{ top: '185px', right: '20vw' }}
              className="bg-warning-100 dark:hidden absolute rounded-full h-12 w-12"
            />

            <div
              style={{ bottom: '120px', right: '17vw' }}
              className="bg-caution-100 dark:hidden absolute rounded-full h-12 w-12"
            />

            <div
              style={{ bottom: '-40px', left: '10vw' }}
              className="bg-success-100 dark:hidden absolute rounded-full h-14 w-14"
            />
            <div
              style={{ bottom: '-180px', right: '6vw' }}
              className="bg-intermediate-100 dark:hidden absolute rounded-full h-10 w-10"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        blog
        socialMedia {
          platform
          url
        }
      }
    }
  }
`