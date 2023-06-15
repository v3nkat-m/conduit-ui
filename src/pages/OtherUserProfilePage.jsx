import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import ArticleComponent from '../components/ArticleComponent'
import { useUserStatus } from '../hooks/useUserState'
import { useRedirect } from '../hooks/useRedirect'

export default function OtherUserProfilePage() {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const navigate = useRedirect

  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()
  const [showArticles, setShowArticles] = useState(true)

  const handleMenuClick = section => {
    setShowArticles(section === 'articles')
  }

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/users/profile/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  const [articles, setArticles] = useState([]) // New state variable for articles

  const fetchUserArticles = async () => {
    try {
      const response = await axios.get(`/articles/user/${userId}`)
      setArticles(response.data.articles)
    } catch (error) {
      console.error('Error fetching user articles:', error)
    }
  }

  useEffect(() => {
    fetchUserArticles()
  }, [userId])

  return (
    <div>
      <div>{isLoggedIn && isCheckingLogin ? <Header2 /> : <Header />}</div>
      <div className='profile-wrapper'>
        <div className='profile-flex-container'>
          <img
            src={user.picture}
            alt='Profile Picture'
            className='profile-img'
          />
          <h1 className='profile-user'>{user.name}</h1>
        </div>
        {/* <p className='profile-email'>Email: {user.email}</p> */}
        <p className='profile-bio'>{user.bio}</p>
      </div>
      <div>
        <div className='profile-menu'>
          <div
            className={`menu-item ${showArticles ? 'active' : ''}`}
            onClick={() => handleMenuClick('articles')}
          >
            Articles
          </div>
          <div
            className={`profile-menu-item ${!showArticles ? 'active' : ''}`}
            onClick={() => handleMenuClick('edit-profile')}
          ></div>
        </div>
        <div className='profile-content'>
          {showArticles ? (
            <ArticleComponent user={user} articles={articles} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
