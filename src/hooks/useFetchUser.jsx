import { useState, useEffect, useCallback } from 'react'
import api from '../axiosConfig'

export const useFetchUser = userId => {
  const [user, setUser] = useState({})

  const fetchUserProfile = useCallback(async () => {
    if (!userId) return
    try {
      const response = await api.get(`/users/profile/${userId}`)
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
