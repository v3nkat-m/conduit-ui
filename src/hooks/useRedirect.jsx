import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//I had some problems in some of the demos when the profile page getting displayed even when the user is not logged in. Fixed it in backend. But keeping this still but not using it anywhere in frontend
export const useRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/auth/userstatus')
        const { isLoggedIn } = response.data
        if (!isLoggedIn) {
          navigate('/auth/signup') // Redirect to signup page if not logged in
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      }
    }

    checkAuthentication()
  }, [navigate])

  return navigate
}
