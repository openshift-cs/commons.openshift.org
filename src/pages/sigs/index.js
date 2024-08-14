import React from 'react'
import { useState } from 'react'
import Seo from '../../components/seo'
import { PlusCircle, MinusCircle } from 'react-feather'
import {
  Bookmark,
  ChevronsRight,
  Cloud,
  Cpu,
  ExternalLink,
  Flag,
  Power,
  Shield,
  Smartphone,
  Tool,
  Truck,
  Zap,
  Loader,
} from 'react-feather'
import { StaticImage } from 'gatsby-plugin-image'
import Callout from '../../components/callout'
import IconBox from '../../components/iconbox'
import * as Accordion from '@radix-ui/react-accordion'
import OperatorsCarousel from '../../components/operators-carousel'
import ModernTriangle from '../../icons/ModernTriangle'

const AccordionItem = ({ ...props }) => {
  const { title, icon, children } = props
  const [open, setOpen] = useState(false)

  return (
    <Accordion.Item value={title}>
      <Accordion.Header>
        <Accordion.Trigger
          onClick={() => setOpen(!open)}
          className={`${
            open &&
            'text-secondary-800 hover:text-secondary-900 bg-secondary-200 hover:bg-secondary-200'
            } w-full border-b border-base-500 hover:bg-base-200 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary-600 text-left py-4 px-3 text-xl lg:text-2xl font-medium`}
        >
          <h2 className="flex items-center space-x-3">
            {open ? (
              <MinusCircle className="flex-shrink-0 w-6 h-6" />
            ) : (
                <PlusCircle className="flex-shrink-0 w-6 h-6" />
              )}
            <span className="flex gap-2 space-x-6 items-center">
              <span className="inline h-6 w-6 lg:h-8 lg:w-8">{icon}</span> {title}
            </span>
          </h2>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="text-left p-4 pb-16 border-b border-base-500 lg:text-lg">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  )
}

export default function SIGPage() {
  const headingStyle = 'font-headings text-3xl lg:text-5xl text-base-800 mb-2 lg:mb-4'
  const h3Style = 'font-headings text-xl lg:text-3xl text-base-800 mt-4 lg:mt-8 mb-2 lg:mb-4'
  const h4Style = 'font-headings text-lg lg:text-xl text-base-800 mb-1.5 lg:mb-3'
  const ledeStyle = 'max-w-[60ch] text-center text-lg lg:text-xl text-base-600 mb-6'
  const paragraphStyle = 'mb-4'

  const PodEscape = () => (
    <StaticImage
      src="../../images/PodEscape.png"
      alt="Pod Escape game opening screen"
      width="480"
      height="270"
    />
  )

  return (
    <>
      <Seo title="SIGs" />
      <div className="overflow-hidden text-center py-12 md:py-16 lg:pb-24">
        <div className="flex flex-col items-center space-y-32 page-wrapper">
          <section className="flex flex-col items-center space-y-8 w-full max-w-screen-lg relative z-0">
            <h1 className={`${headingStyle} text-center`}>Special Interest Groups</h1>
            <p className={ledeStyle}>
              Being a part of an inclusive, open, and inviting community such as Commons means that
              you're part of the conversation. Our Special Interest Groups (SIG) are designed so
              that you can find everything you need in one place around a central topic.
            </p>
            <Accordion.Root className="w-full border-t border-base-500" type="multiple">
              <AccordionItem title="Edge" icon={<Loader alt="" />}>
                <p className={paragraphStyle}>
                  The purpose of the edge SIG is to collaborate and share information around best practices and lessons learned for the community’s deployment at the edge.
                </p>
                <h3 className={h3Style}>About edge computing</h3>
                <p className={paragraphStyle}>
                  Simply put, edge computing is when compute/insights/decisions happen outside of larger, centralized data centers and public clouds.
                  This Special Interest Group is a way for the community to meet, discuss and share information about a quickly-growing, highly-variable subject.
                </p>
                <h3 className={h3Style}>Links</h3>
                <div className="grid lg:grid-cols-3 my-8 lg:my-0 gap-8 page-wrapper">
                  <Callout
                    title="What is edge computing?"
                    url="https://www.redhat.com/en/topics/edge-computing/what-is-edge-computing"
                    icon={<ExternalLink alt="" />}
                  >
                    Edge computing is computing that takes place at or near the physical location of either the user or the source of the data
                  </Callout>
                  <Callout
                    title="Edge computing with Red Hat OpenShift?"
                    url="https://www.redhat.com/en/technologies/cloud-computing/openshift/edge-computing"
                    icon={<ExternalLink alt="" />}
                  >
                    For organizations using cloud-native applications, virtual machines (VMs), IoT (Internet of Things), and cloud computing to deliver extraordinary customer experiences, or using applications powered by artificial intelligence and machine learning (AI/ML) to unlock new opportunities from data, they are evolving and distributing their IT infrastructure using edge computing to get resources as close to the data and users as possible.
                  </Callout>
                  <Callout
                    title="Edge computing with Red Hat Device Edge"
                    url="https://www.redhat.com/en/topics/edge-computing/what-is-edge-computing"
                    icon={<ExternalLink alt="" />}
                  >
                    Devices at the far edge need a different approach. Edge devices such as assembly line tools, IoT gateways, points of sale, and industrial controllers have to operate with limited computing resources, power, cooling, and connectivity.
                  </Callout>
                </div>
                <h3 className={h3Style}>Connect with us</h3>
                <div className="grid lg:grid-cols-2 my-8 lg:my-0 gap-8 page-wrapper">
                  <Callout
                    title="Missed a session?"
                    url="https://www.youtube.com/playlist?list=PLaR6Rq6Z4IqceDBWosHflxRFiJSqIT4Aa"
                    icon={<ExternalLink alt="" />}
                  >
                    Check out our Edge SIG Playlist
                  </Callout>
                  <Callout
                    title="Join our live sessions"
                    url="https://docs.google.com/document/d/1Amxly4E5FHyH8QbQQxHip2d3Ip87Hdrh_IPpoP7YLiE/edit?usp=sharing"
                    icon={<ExternalLink alt="" />}
                  >
                    OpenShift Commons Edge SIG - Agenda
                  </Callout>
                </div>
              </AccordionItem>
              <AccordionItem title="Validated Patterns" icon={<ModernTriangle alt="" />}>
                <p className={paragraphStyle}>
                  The focus of the Validated Patterns SIG is to discuss common use cases and the business problems being solved in order to spark conversation and share architectures.
                  In discussing the use cases being developed, we can learn from each other and understand why specific components were chosen and allow each of us to grow over time.
                  This SIG is open to all Architecture related Communities of Practice.
                </p>
                <div className="mb-8 flex flex-col lg:flex-row lg:space-x-8 text-left">
                  <div className="w-full lg:w-1/2">
                    <h3 className={h3Style}>Introduction</h3>
                    <p className={paragraphStyle}>
                      Watch this video to see benefits of using Patterns to deploy distributed architectures
                    </p>
                    <div className="video-embed mb-8">
                      <iframe
                        title="YouTube Video"
                        src="https://www.youtube.com/embed/dGsoUNjHYOw?si=gqtTKp9EAAkB3bxA"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className={h3Style}>Principles</h3>
                    <ul className="mb-4 list-disc ml-4 text-lg">
                      <li className="mb-4">Distributed reference architectures</li>
                      <li className="mb-4">GitOps Framework</li>
                      <li className="mb-4">Declarative modalities</li>
                      <li className="mb-4">Repeatable, Scalable, Extensible</li>
                      <li className="mb-4">Built and Maintained as code</li>
                      <li className="mb-4">Fast track proofs of concept (POCs)</li>
                      <li className="mb-4">Create repeatable frameworks for easier testing and deployment</li>
                    </ul>
                    <h4 className={h4Style}>About Validated Patterns</h4>
                    <p className={paragraphStyle}>
                      Validated Patterns are an evolution of how you deploy applications in a hybrid cloud.
                      With a pattern, you can automatically deploy a full application stack through a GitOps-based framework.
                      With this framework, you can create business-centric solutions while maintaining a level of Continuous Integration (CI) over your application.
                    </p>
                  </div>
                </div>
                <h3 className={h3Style}>Links</h3>
                <div className="grid lg:grid-cols-2 my-8 lg:my-0 gap-8 page-wrapper">
                  <Callout
                    title="Missed a session?"
                    url="https://www.youtube.com/playlist?list=PLaR6Rq6Z4Iqf8CbyJFX9vSVxBc9sBTIKK"
                    icon={<ExternalLink alt="" />}
                  >
                    Check out our Validated Patterns SIG Playlist
                  </Callout>
                  <Callout
                    title="Do you have an experience you’d like to discuss?"
                    url="https://forms.gle/E7w3iCgX3PaRsf9P6"
                    icon={<ExternalLink alt="" />}
                  >
                    Submit a session
                  </Callout>
                </div>
              </AccordionItem>
              <AccordionItem title="DevSecOps" icon={<Shield alt="" />}>
                <p className={paragraphStyle}>
                  The purpose of the DevSecOps SIG is to collaborate and share information around
                  best practices and lessons learned for the DevSecOps community.
                </p>
                <div className="mb-8 flex flex-col lg:flex-row lg:space-x-8 text-left">
                  <div className="w-full lg:w-1/2">
                    <h3 className={h3Style}>Briefing</h3>
                    <p className={paragraphStyle}>
                      Red Hat's John Willis gives a brief introduction to DevSecOps.
                    </p>
                    <div className="video-embed mb-8">
                      <iframe
                        title="YouTube Video"
                        src="https://www.youtube.com/embed/RDVUZeiavFQ?rel=0"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h3 className={h3Style}>Principles</h3>
                    <ul className="mb-4 list-disc ml-4 text-lg">
                      <li className="mb-4">Customer Focused Mindset</li>
                      <li className="mb-4">Scale Security</li>
                      <li className="mb-4">Objective Criteria</li>
                      <li className="mb-4">Proactive Hunting</li>
                      <li className="mb-4">Continuous Detection and Response</li>
                    </ul>
                    <h4 className={h4Style}>About DevSecOps</h4>
                    <p className={paragraphStyle}>
                      DevSecOps is as much about operations as it is about development. This Special
                      Interest Group is way for like-minded engineers to discuss and share
                      information to aid in security on OpenShift.
                    </p>
                  </div>
                </div>
                <h3 className={h3Style}>Links</h3>
                <div className="grid lg:grid-cols-2 my-8 lg:my-0 gap-8 page-wrapper">
                  <Callout
                    title="DevSecOps Manifesto"
                    url="https://www.devsecops.org/"
                    icon={<ExternalLink alt="" />}
                  >
                    Discover more about DevSecOps
                  </Callout>
                  <Callout
                    title="DevSecOps: The End of The Beginning"
                    type="warning"
                    url="https://www.slideshare.net/littleidea/devsecops-the-end-of-the-beginning-austin"
                    icon={<ExternalLink alt="" />}
                  >
                    A slideshow by Andrew Clay Schafer @ DevOpsDay Austin 2019
                  </Callout>
                </div>
              </AccordionItem>
              <AccordionItem title="Machine Learning on OpenShift" icon={<Cpu alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the Machine Learning on OpenShift Special Interest Group
                  is to discuss, develop and disseminate best practices for deploying and managing
                  Machine Learning workloads and applications on OpenShift built using (but not
                  limited to) TensorFlow, Apache Spark and other Open Source ML/AI frameworks.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift .EDU" icon={<Bookmark alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift .EDU Special Interest Group is to
                  collaborate and discuss items for the OpenShift platform in .EDU setting.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift Image Builders" icon={<Tool alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift Image Builders Special Interest Group is to
                  collaborate and discuss Best Practices for building and maintaining Images for use
                  with OpenShift.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift Energy" icon={<Power alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the Energy Special Interest Group is to discuss, develop
                  and disseminate best practices to support energy companies as they modernize their
                  IT infrastructures on OpenShift.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift on IBM Cloud" icon={<Cloud alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift on IBM Cloud Special Interest Group is to
                  collaborate and share information around best practices for operating and
                  maintaining OpenShift environments on IBM Cloud.
                </p>
                <h3 className={h3Style}>Briefing</h3>
                <p className={paragraphStyle}>
                  IBM's Sai Vennam gives a guided tour of OpenShift on IBM Cloud.
                </p>
                <div className="mb-8 flex flex-col lg:flex-row lg:space-x-8 text-left">
                  <div className="w-full lg:w-1/2">
                    <div className="video-embed mb-8">
                      <iframe
                        title="YouTube Video"
                        src="https://www.youtube.com/embed/l4Vrj7mkxhQ?rel=0"
                        frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                    <h4 className={`${h4Style} mt-8`}>About OpenShift on IBM Cloud</h4>
                    <p className={paragraphStyle}>
                      This Special Interest Group is for like-minded IT practitioners, engineers and
                      developers to discuss and share information about deploying and maintaining
                      OpenShift at scale on IBM Cloud.
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <h4 className={h4Style}>Topics Covered</h4>
                    <ul className="mb-4 list-disc ml-4 text-lg">
                      <li className="mb-4">
                        Leveraging OpenShift tools and APIs for a single, consistent experience
                        across hybrid environments or different cloud providers.
                      </li>
                      <li className="mb-4">
                        Protecting cluster infrastructure, isolating compute resources, encrypting
                        data, and ensuring security compliance.
                      </li>
                      <li className="mb-4">
                        Quickly setting up a CI/CD with Jenkins or deploying a variety of apps in a
                        guided experience that's fully integrated into your OpenShift cluster.
                      </li>
                      <li className="mb-4">
                        Using built-in services for monitoring, logging, load-balancing, storage,
                        and security.
                      </li>
                      <li className="mb-4">
                        Deploying and scaling workloads with a managed master that is automatically
                        spread across zones within a region for high availability.
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className={h3Style}>Test your container skills with PodEscape</h3>
                <p className={paragraphStyle}>Check PodEscape running on OpenShift on IBM Cloud.</p>
                <div className="mb-8 flex flex-col lg:flex-row lg:space-x-8 text-left">
                  <div className="w-full lg:w-1/2">
                    <a
                      className="block mb-8"
                      href="https://arcade.redhat.com/pod-escape/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <PodEscape />
                    </a>
                  </div>
                  <div className="lg:w-1/2">
                    <h4 className={h4Style}>Check it out!</h4>
                    <p className={paragraphStyle}>
                      Test your container skills with PODESCAPE, an endless runner of a pod trying
                      to escape from a project being deleted. Compete with fellow devs for the
                      highest score. And don't be fooled by the retro feel...with the git link you
                      can tinker under the hood with OpenShift on IBM Cloud, MongoDB, and OpenShift
                      Container Storage.
                    </p>
                  </div>
                </div>
                <h3 className={h3Style}>Links</h3>
                <div className="grid lg:grid-cols-2 my-8 lg:my-0 gap-8 page-wrapper">
                  <Callout
                    title="Create an OpenShift on IBM Cloud cluster"
                    url="https://cloud.ibm.com/docs/openshift?topic=openshift-openshift_tutorial"
                    icon={<ExternalLink alt="" />}
                  >
                    Tutorial on creating a cluster with worker nodes that come installed with
                    OpenShift container orchestration platform
                  </Callout>
                  <Callout
                    title="Scalable web application on OpenShift"
                    type="warning"
                    url="https://cloud.ibm.com/docs/solution-tutorials?topic=solution-tutorials-scalable-webapp-openshift"
                    icon={<ExternalLink alt="" />}
                  >
                    Tutorial on deploying an application on OpenShift on IBM Cloud
                  </Callout>
                </div>
              </AccordionItem>
              <AccordionItem title="OpenShift on OpenStack" icon={<Cloud alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift on OpenStack Special Interest Group is to
                  discuss, develop and disseminate best practices for deploying and managing
                  OpenShift on OpenStack.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift .GOV" icon={<Flag alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift in .GOV Special Interest Group is to
                  discuss, develop and disseminate best practices for deploying and managing
                  OpenShift in .GOV.
                </p>
              </AccordionItem>
              <AccordionItem title="OpenShift in Automotive" icon={<Truck alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the OpenShift in Automotive Special Interest Group is to
                  discuss, develop and disseminate best practices for deploying and managing
                  OpenShift in Automotive.
                </p>
              </AccordionItem>
              <AccordionItem title="Mobile on OpenShift" icon={<Smartphone alt="" />}>
                <p className={paragraphStyle}>
                  The principal purpose of the Mobile on OpenShift Special Interest Group is to
                  discuss, develop and disseminate best practices for deploying and managing Mobile
                  Applications on OpenShift built on (but not limited to) FeedHenry and a wide
                  variety of popular toolkits including native SDKs, hybrid Apache Cordova, HTML5
                  and Titanium, as well as frameworks such as Xamarin, Sencha Touch, and other
                  JavaScript frameworks.
                </p>
              </AccordionItem>
              <AccordionItem title="Operator Framework" icon={<Zap alt="" />}>
                <p className={paragraphStyle}>
                  An Operator is a method of packaging, deploying and managing a Kubernetes
                  application. A Kubernetes application is an application that is both deployed on
                  Kubernetes and managed using the Kubernetes APIs and kubectl tooling. To be able
                  to make the most of Kubernetes, you need a set of cohesive APIs to extend in order
                  to service and manage your applications that run on Kubernetes. You can think of
                  Operators as the runtime that manages this type of application on Kubernetes.
                </p>

                <h3 className={h3Style}>Join the Operator Framework Special Interest Group</h3>
                <p className={paragraphStyle}>
                  The principal purpose of the Operator Framework SIG is to discuss, develop and
                  disseminate best practices for building Operators, using Operators and help grow
                  the Operator ecosystem by engaging and learning from Operator authors, users and
                  contributors to the Operator Framework itself.
                </p>
                <h3 className={h3Style}>Community Operators</h3>
                <OperatorsCarousel />
                <p className={paragraphStyle}>
                  <IconBox
                    title="Explore Community Operators"
                    url="/sigs/operators/"
                    icon={<ChevronsRight />}
                    right="1"
                  />
                </p>
              </AccordionItem>
            </Accordion.Root>
            <p className="mt-6 mb-2 text-center">
              <IconBox title="Ready to join?" url="/virtualgatherings/" />
            </p>
            <div
              className="absolute w-full top-0 left-0 h-full pointer-events-none z-[-1]"
              aria-hidden
            >
              <div
                style={{ bottom: '-100px', left: '-5vw' }}
                className="bg-primary-100 dark:bg-accent-100 absolute rounded-full h-9 w-9"
              />
              <div
                style={{ bottom: '350px', right: '-9vw' }}
                className="bg-caution-100 dark:bg-accent-100 absolute rounded-full h-12 w-12"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
