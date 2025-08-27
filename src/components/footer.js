import { Link } from 'gatsby'
import React from 'react'
import SocialMediaIcons from '../components/social-media-icons'
//import SubscribeUpdates from '../components/subscribe-updates'
//import { ReactComponent as FooterGraphic } from '../images/footer-rox.svg'
import { ReactComponent as RedHatLogo } from '../images/red-hat-logo.svg'

export const Footer = () => {
  const listStyle =
    'border-b py-3 md:py-0 md:border-0 border-base-500 dark:border-secondary-300'
  return (
    <footer className="bg-secondary-800 flex flex-col text-secondary-100 dark:text-secondary-900 w-full justify-center dark:bg-secondary-200 md:pt-3">
      <section className="page-wrapper flex flex-col w-full justify-between pt-2 pb-8 md:pb-10 lg:pb-4">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:items-center">
          <ul className="flex flex-col md:flex-row justify-between lg:space-x-10 text-base-300 dark:text-secondary-600 text-base">
            <li className={listStyle}>
              &copy;{new Date().getUTCFullYear()} Red Hat
            </li>
            <li className={listStyle}>Sponsored by Red Hat, Inc.</li>
            <li className={listStyle}>
              <Link
                className="underline hover:text-base-200 border-base-500 dark:hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-base-200 dark:focus:ring-secondary-900"
                to="/code-conduct/"
              >
                Code of Conduct
              </Link>
            </li>
            <li className={listStyle}>
              <Link
                className="underline hover:text-base-200 dark:hover:text-secondary-900 focus:outline-none focus:ring-2 focus:ring-base-200 dark:focus:ring-secondary-900"
                to="/legal/"
              >
                Legal & Privacy
              </Link>
            </li>
          </ul>
          <div className="mt-8 lg:mt-0 rounded flex border lg:border-0 border-base-500 dark:border-secondary-400 p-3 lg:p-0 items-center justify-between space-x-4 ">
            <span className="md:flex lg:hidden text-base-400 dark:text-secondary-600 space-x-1">
              <span className="hidden md:flex font-semibold">
                Reach out to us on{' '}
              </span>
              <span className="flex md:hidden font-semibold">Social:</span>
              <span className="hidden md:flex font-semibold">
                social media:
              </span>
            </span>
            <SocialMediaIcons />
          </div>
        </div>
        {/* <div className="flex md: pt-4 lg:pt-4 xl:pt-0 mt-2 md:space-x-16 items-center">
          <SubscribeUpdates />
          <div className="hidden lg:flex lg:w-1/2 flex-shrink-0">
            <FooterGraphic aria-hidden />
          </div>
        </div> */}
      </section>
      <section className="flex w-full border-t border-base-500 dark:border-secondary-300">
        <div className="flex flex-col w-full page-wrapper my-4 justify-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://redhat.com"
            className="flex w-36 mb-2 flex-shrink-0 rounded-sm ring-offset-4 ring-offset-base-700 dark:ring-offset-secondary-100 hover:ring-base-500 focus:ring-primary-600 hover:ring-2 focus:outline-none focus:ring-2"
          >
            <RedHatLogo alt="Red Hat logo" />
            <span className="sr-only">Red Hat</span>
          </a>
          <p className="text-base-400 dark:text-secondary-600">
            Powered by Red Hat OpenShift Dedicated.
          </p>
        </div>
      </section>
    </footer>
  )
}
