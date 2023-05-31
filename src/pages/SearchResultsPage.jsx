import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchArticle from '../components/SearchArticle'

export default function SearchResultsPage() {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('q')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('/articles/search', {
          params: { q: searchTerm },
        })
        const searchResults = response.data
        setSearchResults(searchResults)
        console.log('Search Results--', searchResults)
      } catch (error) {
        console.error('Search error:', error)
        console.log('error')
      }
    }

    fetchSearchResults()
  }, [searchTerm])

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <div>
        {searchResults.map(article => (
          <SearchArticle key={article.objectID} article={article} />
        ))}
      </div>
    </div>
  )
}
