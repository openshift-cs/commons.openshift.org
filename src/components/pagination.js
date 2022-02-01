import React from 'react'
import { Link } from 'gatsby'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather'

const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages,
  } = pageContext

  const linkClass =
    'px-3 flex items-center space-x-3 py-2 border-2 border-base-400 rounded hover:border-base-500 focus:ring-2 focus:ring-base-500 font-medium'
  const iconClass = 'inline h-5 w-5'

  return (
    <nav className="flex justify-between my-8 items-center">
      {numberOfPages > 1 && (
        <div className="font-medium">
          Page {humanPageNumber} of {numberOfPages}
        </div>
      )}
      <div className="flex space-x-3">
        {previousPagePath && (
          <Link to={`${previousPagePath}/`} rel="prev" className={linkClass}>
            <ArrowLeftCircle aria-hidden className={iconClass} />
            <div className="flex space-x-1">
              <span>Previous</span>
              <span className="sr-only md:not-sr-only">page</span>
            </div>
          </Link>
        )}

        {nextPagePath && (
          <Link to={`${nextPagePath}/`} rel="next" className={linkClass}>
            <div className="flex space-x-1">
              <span>Next</span>
              <span className="sr-only md:not-sr-only">page</span>
            </div>
            <ArrowRightCircle aria-hidden className={iconClass} />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pagination
