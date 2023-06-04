import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import SearchArticle from '../components/SearchArticle'
import { useUserStatus } from '../hooks/useUserState'
import { useFetchUser } from '../hooks/useFetchUser'
import Header from '../components/Header'
import Header2 from '../components/Header2'

export default function SearchResultsPage() {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('q')
  const [searchResults, setSearchResults] = useState([])
  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('/articles/search', {
          params: { q: searchTerm },
        })
        const searchResults = response.data
        setSearchResults(searchResults)
        // console.log('Search Results--', searchResults)
      } catch (error) {
        console.error('Search error:', error)
        // console.log('error')
      }
    }

    fetchSearchResults()
  }, [searchTerm])

  return (
    <div>
      <div>{isLoggedIn && isCheckingLogin ? <Header /> : <Header2 />}</div>
      <div className='search-article-wrapper'>
        <h1>Search Results for "{searchTerm}"</h1>
        <div>
          {searchResults.map(article => (
            <SearchArticle key={article.objectID} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
