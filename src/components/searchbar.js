import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Search from './search'

const SearchBar = ({ state, onClick }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data) => (
      <Search
        state={state}
        onClick={onClick}
        searchIndex={data.siteSearchIndex.index}
      />
    )}
  />
)

export default SearchBar
