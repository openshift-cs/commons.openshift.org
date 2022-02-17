import React, { useState } from 'react'
import Seo from '../../components/seo'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import IconBox from '../../components/iconbox'
import { Code, Search as SearchIcon } from 'react-feather'

const LogoImage = ({ image, innerClassName, ...other }) => {
  const logo = getImage(image)

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={logo} alt="" />
    </div>
  )
}

const Operators = ({ onClick }) => {
  const [filterInput, setFilterInput] = useState('')

  const filterQuery = (evt) => {
    const query = evt.target.value
    setFilterInput(query)
  }

  return (
    <StaticQuery
      query={graphql`
        {
          allOperatorsYaml {
            nodes {
              title
              description
              link
              src_link
              logo {
                childImageSharp {
                  gatsbyImageData(width: 192, formats: [AUTO, WEBP])
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <>
          <div className="relative block md:!w-auto lg:!w-[410px]">
            <div className="flex w-full justify-center items-center">
              <label
                className="pl-2 w-6 h-6 absolute transform left-0 pointer-events-none"
                htmlFor="filterbox"
              >
                <SearchIcon alt="" className="text-base-600 absolute w-full h-full" />
                <span className="sr-only">Search operators</span>
              </label>
              <div className="shadow-underline text-base-400 w-full">
                <input
                  id="filterbox"
                  type="search"
                  className="form-input bg-base-100 dark:bg-base-0 flex pl-10 w-full placeholder-base-500 focus:bg-base-200 border-0 py-2 border-base-400 hover:border-base-500 focus:border-base-500 pr-2 h-9 md:h-10 lg:h-11 text-base-700 rounded-t-sm hover:rounded-sm hover:ring-2 hover:ring-base-500 focus:ring-2 focus:ring-primary-600 focus:rounded-sm"
                  value={filterInput}
                  onFocus={filterQuery}
                  onChange={filterQuery}
                  placeholder="Search operators"
                />
              </div>
            </div>
          </div>

          <ul className="text-left lg:mx-32">
            {data.allOperatorsYaml.nodes
              .filter(
                (op) =>
                  op.title.toUpperCase().indexOf(filterInput.toUpperCase()) !== -1 ||
                  op.description.toUpperCase().indexOf(filterInput.toUpperCase()) !== -1,
              )
              .sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1))
              .map((op) => (
                <li
                  key={op.title}
                  className="relative mb-4 md:mb-8 flex flex-col md:flex-row md:gap-8 items-start group rounded-md ring-2 ring-primary-400 p-4 hover:ring-4 hover:ring-primary-400 focus-within:ring-4 focus-within:ring-primary-400"
                >
                  <LogoImage
                    image={op.logo}
                    className="w-48 h-auto md:flex-shrink-0 md:w-40 md:mt-4"
                  />
                  <div className="flex-grow">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={op.link}
                      className="focus:outline-none after:absolute after:inset-0"
                    >
                      <span className="block my-2 font-headings font-bold text-lg tracking-wide group-hover:text-primary-700 group-focus:text-primary-700">
                        {op.title}
                      </span>
                    </a>{' '}
                    {op.description}
                  </div>
                  <IconBox
                    title="Source"
                    url={op.src_link}
                    icon={<Code />}
                    className="relative self-end mt-4 !text-sm !py-1"
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    />
  )
}

export default function OperatorsPage() {
  const headingStyle = 'font-headings text-3xl lg:text-5xl text-base-800 mb-2 lg:mb-4'
  const ledeStyle = 'max-w-[60ch] text-center text-lg lg:text-xl text-base-600 mb-6'

  return (
    <>
      <Seo title="Community-created Operators" />
      <div className="overflow-hidden text-center py-12 md:py-16 lg:pb-24">
        <div className="flex flex-col items-center space-y-32 page-wrapper">
          <section className="flex flex-col items-center space-y-8 w-full max-w-screen-lg relative z-0">
            <h1 className={`${headingStyle} text-center`}>Community-created Operators</h1>
            <p className={ledeStyle}>
              Take a few moments to learn what these operators can do for your systems deployed on
              OpenShift.
            </p>
            <Operators />
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
