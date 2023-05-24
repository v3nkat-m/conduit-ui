import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import '../css/ProfilePage.css'
import ArticleComponent from '../components/ArticleComponent'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [showArticles, setShowArticles] = useState(true)

  const handleMenuClick = section => {
    setShowArticles(section === 'articles')
  }

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)

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
  const [user, setUser] = useState({})
  const [bio, setBio] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/users/profile')
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const updateProfile = async () => {
    const formData = new FormData()
    formData.append('bio', bio)
    formData.append('name', name)
    if (picture) {
      formData.append('picture', picture)
    }

    try {
      const response = await axios.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setUser(response.data)
      setBio('')
      setName('')
      setPicture(null)
    } catch (error) {
      console.error('Error updating user profile:', error)
    }
  }

  const handlePictureChange = e => {
    setPicture(e.target.files[0])
  }
  console.log(user.picture)

  const [articles, setArticles] = useState([]) // New state variable for articles

  useEffect(() => {
    fetchUserArticles()
  }, [])

  const fetchUserArticles = async () => {
    try {
      const response = await axios.get('/users/profile')
      setUser(response.data)

      // Fetch the user's articles

      const articleResponse = await axios.get(
        `articles/user/${response.data._id}`
      )
      console.log('article Response-----------', articleResponse)
      setArticles(articleResponse.data.articles)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
  return (
    <div>
      <div>{isLoggedIn && isCheckingLogin ? <Header /> : <Header2 />}</div>
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
          >
            Edit Profile
          </div>
        </div>
        <div className='profile-content'>
          {showArticles ? (
            <ArticleComponent user={user} articles={articles} />
          ) : (
            <div>
              <h3>Update Profile</h3>
              <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} />
              </div>
              <div>
                <label>name:</label>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Profile Picture:</label>
                <input type='file' onChange={handlePictureChange} />
              </div>
              <button onClick={updateProfile}>Update</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
