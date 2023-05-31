import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import axios from 'axios'

// Styled component for customized InputBase
const SearchInput = styled(InputBase)({
  fontSize: '1.5rem',
  width: '150px',
  padding: '5px',
})

export default function SearchBar() {
  const [inputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (searchTerm.trim() !== '') {
      try {
        const response = await axios.get('/articles/search', {
          params: { q: searchTerm },
        })
        const searchResults = response.data
        setSearchResults(searchResults)
        // Handle the search results as needed
        console.log(searchResults)
      } catch (error) {
        console.error('Search error:', error)
        // Handle the error as needed
      }
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div>
      {!inputVisible && (
        <SearchIcon
          style={{ fontSize: 24, cursor: 'pointer' }}
          onClick={() => setInputVisible(true)}
        />
      )}
      {inputVisible && (
        <form onSubmit={handleSubmit}>
          <SearchInput
            type='text'
            placeholder='Search in conduit'
            autoFocus
            value={searchTerm}
            onChange={handleChange}
            onBlur={() => setInputVisible(false)}
          />
        </form>
      )}
    </div>
  )
}
