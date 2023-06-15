import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useFetchUser = userId => {
  const [user, setUser] = useState({})

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return
    try {
      const response = await axios.get(`/users/profile/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [userId])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  return { user }
}
