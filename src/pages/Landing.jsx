import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import '../css/Landing.css'
import AllArticleComponent from '../components/AllArticleComponent'
import { useUserStatus } from '../hooks/useUserState'
import useFetchArticles from '../hooks/useFetchArticles'

export default function Landing() {
  const { isLoggedIn, isCheckingLogin } = useUserStatus()
  const { articles } = useFetchArticles()

  return (
    <div>
      <div
        className={isLoggedIn ? 'landing-wrapper-logged-in' : 'landing-wrapper'}
      >
        {isCheckingLogin ? null : isLoggedIn ? <Header2 /> : <Header />}
        {isCheckingLogin ? null : isLoggedIn ? null : <Banner />}
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
