import { UserContext } from './UserContext'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export function UserContextProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const response = await axios.get('/auth/userstatus')
        setCurrentUserId(response.data.UserId)
        console.log('usercontext response.data:', response.data.UserId)
      } catch (error) {
        console.error('Error fetching user status', error)
      }
    }

    fetchCurrentUserId()
  }, [])

  return (
    <UserContext.Provider value={currentUserId}>
      {children}
    </UserContext.Provider>
  )
}
