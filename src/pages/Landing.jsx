import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import '../css/Landing.css'
import AllArticleComponent from '../components/AllArticleComponent'

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('/auth/userstatus', {
          withCredentials: true,
        })
        console.log('User response', response.data)
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('articles/allarticles')
        setArticles(response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div>
      <div
        className={isLoggedIn ? 'landing-wrapper-logged-in' : 'landing-wrapper'}
      >
        {isCheckingLogin ? null : isLoggedIn ? <Header2 /> : <Header />}
        {isCheckingLogin ? null : isLoggedIn ? (
          <AllArticleComponent articles={articles} />
        ) : (
          <Banner />
        )}
      </div>
      {isCheckingLogin ? null : isLoggedIn ? <Footer /> : <Footer />}
    </div>
  )
}
