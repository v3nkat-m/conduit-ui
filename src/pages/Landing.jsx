import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import '../css/Landing.css'
import AllArticleComponent from '../components/AllArticleComponent'
import FeaturedComponent from '../components/FeaturedComponent'
import { useUserStatus } from '../hooks/useUserState'

export default function Landing() {
  const [articles, setArticles] = useState([])
  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('articles/allarticles')
        // console.log('response allarticles', response)
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
          <FeaturedComponent />
        ) : (
          <Banner />
        )}
      </div>
      <div className='landing-articles-wrapper'>
        <div className='landing-articles'>
          <AllArticleComponent articles={articles} />
        </div>
      </div>
      {isCheckingLogin ? null : isLoggedIn ? <Footer /> : <Footer />}
    </div>
  )
}
