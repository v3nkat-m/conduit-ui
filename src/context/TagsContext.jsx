import React, { createContext, useState, useEffect } from 'react'
import api from '../axiosConfig'

export const TagsContext = createContext([])

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get('/tags/tags')
        setTags(res.data)
        // console.log('Response-------------------', res)
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      }
    }

    fetchTags()
  }, [])

  return <TagsContext.Provider value={tags}>{children}</TagsContext.Provider>
}
