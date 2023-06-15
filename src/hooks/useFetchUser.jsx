import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetchUser = userId => {
  const [user, setUser] = useState({})
  const fetchUserProfile = async () => {
    if (!userId) return
    try {
      const response = await axios.get(`/users/profile/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userId, fetchUserProfile])

  return { user }
}
