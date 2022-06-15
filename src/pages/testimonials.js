import React from 'react'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'

export default function TestimonialsPage() {
  const Twistlock = () => (
    <StaticImage src="../images/twistlock.png" alt="" width="160" className={imageStyle} />
  )

  const Cisco = () => (
    <StaticImage src="../images/Cisco.svg" alt="" width="160" className={imageStyle} />
  )

  const GetUp = () => (
    <StaticImage src="../images/getupcloud.png" alt="" width="160" className={imageStyle} />
  )

  const Amadeus = () => (
    <StaticImage src="../images/Amadeus_Logo.svg" alt="" width="160" className={imageStyle} />
  )

  const Idc = () => (
    <StaticImage src="../images/idc_logo.png" alt="" width="160" className={imageStyle} />
  )

  const Redhat = () => (
    <StaticImage
      src="../images/red-hat-logo-blk.svg"
      alt=""
      width="160"
      className={`dark:hidden ${imageStyle}`}
    />
  )

  const RedhatDark = () => (
    <StaticImage
      src="../images/red-hat-logo.svg"
      alt=""
      width="160"
      className={`!hidden dark:!block ${imageStyle}`}
    />
  )

  const headingStyle = 'font-headings text-3xl lg:text-5xl text-base-800 mb-2 lg:mb-4'

  const quoteStyle = 'mt-10 max-w-[70ch] text-lg md:text-xl lg:text-2xl italic'

  const quotePStyle = 'mb-6 md:mb-8 lg:mb-10'

  const quoteFooter = 'before:content-["—"] not-italic text-right'

  const imageStyle = 'float-left mr-4 lg:mr-8 mt-2 mb-2 lg:mb-4'

  return (
    <>
      <Seo title="Testimonials" />
      <div className="overflow-hidden py-12 md:py-16 lg:pb-24">
        <div className="flex flex-col items-center space-y-32 page-wrapper">
          <section className="max-w-screen-lg">
            <h1 className={`${headingStyle} text-center`}>Testimonials</h1>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <Twistlock />
                At Twistlock, we’ve helped secure some of the world’s largest and earliest adopters
                of containers. Our customers span six continents and nearly every industry, but one
                thing we consistently see is that companies that run mission critical apps in
                containers are choosing OpenShift as their container platform of choice.
              </p>
              <p className={quotePStyle}>
                The combination of OpenShift's enterprise grade reliability, OpenShift Commons'
                active open source community and Red Hat's technical support makes OpenShift an
                especially good choice for the customers we work with in healthcare, financial
                services, and government. Not only does Twistlock have great support for OpenShift
                as a platform, but we are proud to have contributed security and authorizations to
                the OpenShift open source project.
              </p>
              <footer className={quoteFooter}>John Morello, CTO, Twistlock</footer>
            </blockquote>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <Cisco />
                Enterprise CIOs consistently rank DevOps enablement as one of their highest
                priorities. With Openshift Commons, Red Hat has remained true to their opensource
                heritage and proven that Openshift enables open source application life-cycle
                Managerment in a powerful self-service DevOps enablement platform. Openshift aligns
                with the Cisco Intercloud vision of application-centric enablement and portability
                across public and private clouds. We're pleased to be contribute to the OpenShift
                Commons as it enables Cisco to collaborate directly with the entire OpenShift
                ecosystem.
              </p>
              <footer className={quoteFooter}>
                Ken Owens, Chief Technical Officer, Cisco Cloud Services
              </footer>
            </blockquote>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <GetUp />
                OpenShift is critical to our business and the OpenShift Commons has given us a great
                opportunity to connect directly with other OpenShift ecosystem participants. GetUp
                has been involved with OpenShift for more than two years, built a company with this
                open source project and having the opportunity to collaborate and work with them has
                been a great experience. We believe OpenShift Commons is a great opportunity to work
                with other OpenShift members, a channel to get feedback and share knowledge and
                experiences about the market developments and new releases.
              </p>
              <footer className={quoteFooter}>Diogo Goebel, CEO, GetUp Cloud</footer>
            </blockquote>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <Amadeus />
                By participating in the OpenShift Commons, we are able to easily and proactively
                communicate with the community, to jointly build a powerful solution that can
                benefit all users. With both the openness of the virtual meetings and code on
                GitHub, we are able to commit resources to areas in which we have expertise, while
                liaising with other participants to prioritize the common goal — a stable, secure
                and fully open-source solution.
              </p>
              <footer className={quoteFooter}>
                Dietmar Fauser, VP Architecture, Quality & Governance, Amadeus
              </footer>
            </blockquote>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <Idc />
                OpenShift already provides robust choices for developers exploring enterprise and
                community PaaS. OpenShift Commons is a distinctive way of building a strong and open
                network of users, partners and open source community members that will help Red Hat
                add to OpenShift's maturity and drive future PaaS innovation while supporting
                customer adoption.
              </p>
              <footer className={quoteFooter}>Larry Carvalho, PaaS Research Manager, IDC</footer>
            </blockquote>

            <blockquote className={quoteStyle}>
              <p className={quotePStyle}>
                <Redhat />
                <RedhatDark />
                The OpenShift user and partner ecosystems are incredibly vibrant, as are the open
                source technology communities that serve as the foundation for OpenShift and the
                rest of Red Hat’s product line. What we heard from customers,partners, and these
                communities is that they wanted a truly open community where all of these groups can
                intersect and help drive the future of PaaS innovation, and Red Hat is proud to
                facilitate development of a community to foster this broad industry collaboration.
              </p>
              <footer className={quoteFooter}>
                Ashesh Badani, Vice President and General Manager, OpenShift, Red Hat
              </footer>
            </blockquote>
          </section>
        </div>
      </div>
    </>
  )
}
