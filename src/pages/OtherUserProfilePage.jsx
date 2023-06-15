import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import api from '../axiosConfig'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import ArticleComponent from '../components/ArticleComponent'
import { useUserStatus } from '../hooks/useUserState'

export default function OtherUserProfilePage() {
  const { userId } = useParams()
  const [user, setUser] = useState({})

  const { isLoggedIn, isCheckingLogin } = useUserStatus()
  const [showArticles, setShowArticles] = useState(true)

  const handleMenuClick = section => {
    setShowArticles(section === 'articles')
  }

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get(`/users/profile/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [userId])

  useEffect(() => {
    fetchUserProfile()
  }, [userId, fetchUserProfile])

  const [articles, setArticles] = useState([])

  const fetchUserArticles = useCallback(async () => {
    try {
      const response = await api.get(`/articles/user/${userId}`)
      setArticles(response.data.articles)
    } catch (error) {
      console.error('Error fetching user articles:', error)
    }
  }, [userId])

  useEffect(() => {
    fetchUserArticles()
  }, [userId, fetchUserArticles])

  return (
    <div>
      <div>{isLoggedIn && isCheckingLogin ? <Header2 /> : <Header />}</div>
      <div className='profile-wrapper'>
        <div className='profile-flex-container'>
          <img src={user.picture} alt='Profile-Pic' className='profile-img' />
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
