import React, { useState } from 'react'
import Seo from '../components/seo'
import { graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Search as SearchIcon } from 'react-feather'

const LogoImage = ({ image, innerClassName, ...other }) => {
  if (image?.extension === 'svg')
    return (
      <div>
        <img className="max-h-20" width="128" height="80" src={image.publicURL} alt="" />
      </div>
    )

  const logo = getImage(image)

  return (
    <div {...other}>
      <GatsbyImage className={innerClassName} image={logo} alt="" />
    </div>
  )
}

const Participants = ({ onClick }) => {
  const [filterInput, setFilterInput] = useState('')

  const filterQuery = (evt) => {
    setFilterInput(evt.target.value)
  }

  const [typeInput, setTypeInput] = useState('')

  const typeQuery = (evt) => {
    setTypeInput(evt.target.value)
  }

  const [subtypeInput, setSubtypeInput] = useState('')

  const subtypeQuery = (evt) => {
    setSubtypeInput(evt.target.value)
  }

  return (
    <StaticQuery
      query={graphql`
        {
          allParticipantsYaml {
            nodes {
              name
              link
              logo {
                childImageSharp {
                  gatsbyImageData(height: 80, formats: [AUTO, WEBP])
                }
                extension
                publicURL
              }
              metatag1
              metatag2
            }
          }
        }
      `}
      render={(data) => (
        <>
          <div className="relative">
            <div className="flex flex-wrap gap-4">
              <div className="lg:!w-[410px] flex w-full justify-center items-center">
                <label
                  className="pl-2 w-6 h-6 absolute transform left-0 pointer-events-none"
                  htmlFor="filterbox"
                >
                  <SearchIcon alt="" className="text-base-600 absolute w-full h-full" />
                  <span className="sr-only">Search participans</span>
                </label>
                <div className="shadow-underline text-base-400 w-full">
                  <input
                    id="filterbox"
                    type="search"
                    className="form-input bg-base-100 dark:bg-base-0 flex pl-10 w-full placeholder-base-500 focus:bg-base-200 border-0 py-2 border-base-400 hover:border-base-500 focus:border-base-500 pr-2 h-9 md:h-10 lg:h-11 text-base-700 rounded-t-sm hover:rounded-sm hover:ring-2 hover:ring-base-500 focus:ring-2 focus:ring-primary-600 focus:rounded-sm"
                    value={filterInput}
                    onFocus={filterQuery}
                    onChange={filterQuery}
                    placeholder="Search participants"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="filtertype">
                  <span className="sr-only">Participant Type</span>
                </label>
                <select
                  id="filtertype"
                  className="rounded border-2 border-base-400 bg-base-100 dark:bg-base-0 text-base-500 hover:border-base-500 focus:text-base-700 focus:border-primary-600"
                  defaultValue={typeInput}
                  onFocus={typeQuery}
                  onChange={typeQuery}
                >
                  <option value="">— Participant Type —</option>
                  <option value="all">All</option>
                  <option value="enduser">End User</option>
                  <option value="partner">Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {typeInput === 'partner' && (
                <div>
                  <label htmlFor="filtersubtype" className="">
                    <span className="sr-only">Subtype</span>
                  </label>
                  <select
                    id="filtersubtype"
                    className="rounded border-2 border-base-400 bg-base-100 dark:bg-base-0 text-base-500 hover:border-base-500 focus:text-base-700 focus:border-primary-600"
                    defaultValue={subtypeInput}
                    onFocus={subtypeQuery}
                    onChange={subtypeQuery}
                  >
                    <option value="">— Subtype —</option>
                    <option value="all">All</option>
                    <option value="Solution Provider">Solution Provider</option>
                    <option value="Service Cloud Provider">Service/Cloud Provider</option>
                    <option value="Distributor">Distributor</option>
                    <option value="ISV">ISV</option>
                    <option value="OpenShift">OpenShift</option>
                    <option value="OpenStack">OpenStack</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-4 md:gap-8">
            {data.allParticipantsYaml.nodes
              .filter((p) => typeInput === '' || typeInput === 'all' || p.metatag1 === typeInput)
              .filter(
                (p) =>
                  typeInput !== 'partner' ||
                  subtypeInput === '' ||
                  subtypeInput === 'all' ||
                  p.metatag2 === subtypeInput,
              )
              .filter((p) => p.name.toUpperCase().indexOf(filterInput.toUpperCase()) !== -1)
              .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))
              .map((p) => (
                <li
                  key={p.name}
                  className="max-w-[176px] p-2 group rounded-md hover:ring-4 hover:ring-primary-400 focus-within:ring-4 focus-within:ring-primary-400"
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={p.link}
                    className="flex flex-col items-center gap-2"
                  >
                    <LogoImage image={p.logo} className="w-40 h-auto" />
                    <span className="flex-shrink font-headings font-bold text-lg tracking-wide leading-snug group-hover:text-primary-700 group-focus:text-primary-700">
                      {p.name}
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </>
      )}
    />
  )
}

export default function ParticipantsPage() {
  const headingStyle = 'font-headings text-3xl lg:text-5xl text-base-800 mb-2 lg:mb-4'
  const ledeStyle = 'max-w-[60ch] text-lg lg:text-xl text-base-600 mb-6'

  return (
    <>
      <Seo title="OpenShift Commons Participants" />
      <div className="overflow-hidden text-center px-4 py-12 md:py-16 lg:pb-24">
        <div className="flex flex-col items-center space-y-32 xxxpage-wrapper">
          <section className="flex flex-col items-center space-y-8 w-full relative z-0">
            <h1 className={headingStyle}>OpenShift Commons Participants</h1>
            <p className={ledeStyle}>A community of collaborators working together.</p>
            <Participants />
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
