import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('/auth/userstatus', {
          withCredentials: true,
        })
        // console.log('User response', response.data)
        setIsLoggedIn(response.data.isLoggedIn)
        setUserRole(response.data.userRole)
      } catch (error) {
        console.error('Error fetching user status', error)
      } finally {
        setIsCheckingLogin(false)
      }
    }
    fetchUserStatus()
  }, [])

  return { isLoggedIn, userRole, isCheckingLogin }
}
