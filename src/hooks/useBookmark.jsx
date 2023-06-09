import { useState } from 'react'
import api from '../axiosConfig'

const useBookmark = (initialState, id) => {
  const [hasBookmarked, setHasBookmarked] = useState(initialState)

  const bookmarkArticle = async () => {
    try {
      await api.put(`articles/bookmark/${id}`)
      setHasBookmarked(true)
    } catch (error) {
      console.error('Error bookmarking article:', error)
    }
  }

  const unbookmarkArticle = async () => {
    try {
      await api.put(`articles/unbookmark/${id}`)
      setHasBookmarked(false)
    } catch (error) {
      console.error('Error unbookmarking article:', error)
    }
  }

  return [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked]
}

export default useBookmark
