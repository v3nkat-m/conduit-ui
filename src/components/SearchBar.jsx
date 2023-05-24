import React, { useState, useEffect, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/system'

// Styled component for customized InputBase
const SearchInput = styled(InputBase)({
  fontSize: '1.5rem',
  width: '150px',
  padding: '5px',
})

export default function SearchBar() {
  const [inputVisible, setInputVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchRef = useRef()

  const handleClickOutside = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setInputVisible(false)
    }
  }

  useEffect(() => {
    // Add when mounted
    document.addEventListener('mousedown', handleClickOutside)
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  return (
    <div ref={searchRef}>
      {!inputVisible && (
        <SearchIcon
          style={{ fontSize: 24 }}
          onClick={() => setInputVisible(true)}
        />
      )}
      {inputVisible && (
        <SearchInput
          type='text'
          placeholder='Search in conduit'
          autoFocus
          value={searchTerm}
          onChange={handleChange}
        />
      )}
    </div>
  )
}
