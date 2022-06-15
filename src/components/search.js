import React, { useState } from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'
import { Search as SearchIcon } from 'react-feather'
import onClickOutside from 'react-onclickoutside'

const Search = ({ searchIndex, onClick }) => {
  const [index] = useState(Index.load(searchIndex))
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState([])
  const [resultsVisible, setResultsVisible] = useState(false)

  Search.handleClickOutside = () => setResultsVisible(false)

  const onSearchSubmit = () => {
    setResultsVisible(false)
    setSearchInput('')
    if (onClick !== undefined) {
      onClick(false)
    }
  }

  const searchQuery = (evt) => {
    setResultsVisible(true)
    const query = evt.target.value
    setSearchInput(query)

    setResults(
      index
        .search(query, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref)),
    )
  }

  return (
    <div
      style={{ width: 'calc(100vw - 36px)' }}
      className="relative block md:!w-auto lg:!w-[410px]"
    >
      <div className="flex w-full justify-center items-center">
        <label
          className="pl-2 w-6 h-6 absolute transform left-0 pointer-events-none"
          htmlFor="searchbox"
        >
          <SearchIcon alt="" className="text-base-600 absolute w-full h-full" />
          <span className="sr-only">Search for content:</span>
        </label>
        <div className="shadow-underline text-base-400 w-full">
          <input
            id="searchbox"
            type="search"
            className="form-input bg-base-100 dark:bg-base-0 flex pl-10 w-full placeholder-base-500 md:focus:bg-base-200 border-0 py-2  border-base-400 hover:border-base-500 focus:border-base-500 pr-2 h-9 md:h-10 lg:h-11 text-base-700 rounded-t-sm hover:rounded-sm hover:ring-2 hover:ring-base-500 focus:ring-2 focus:ring-primary-600 focus:rounded-sm"
            value={searchInput}
            onFocus={searchQuery}
            onChange={searchQuery}
            placeholder="Search for content"
          />
        </div>
      </div>
      {results.length !== 0 && resultsVisible ? (
        <div className="search-results w-full max-h-[275px] md:w-[400px] lg:w-full flex md:mt-[18px] lg:mt-4 md:max-h-[512px] shadow-2xl right-0 absolute z-10 ring-2 ring-primary-600 rounded-sm bg-base-100">
          <div className="w-full relative overscroll-contain overflow-auto flex flex-col">
            {results.map((page) => (
              <Link
                onClick={onSearchSubmit}
                className="p-3 border-b border-base-300 hover:bg-base-200 text-sm font-semibold text-base-600 focus:bg-base-200"
                to={`/blog${page.slug}`}
                key={page.title}
              >
                {page.title}
              </Link>
            ))}
          </div>
          <div
            className="absolute bg-gradient-to-b from-transparent rounded-b-lg to-base-100 pointer-events-none h-6 w-full bottom-0"
            aria-hidden
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

Search.prototype = {}

const clickOutsideConfig = {
  handleClickOutside: () => Search.handleClickOutside,
}

export default onClickOutside(Search, clickOutsideConfig)
