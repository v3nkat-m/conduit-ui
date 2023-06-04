import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import '../css/ProfilePage.css'
import ArticleComponent from '../components/ArticleComponent'
import AllArticleComponent from '../components/AllArticleComponent'
import { useUserStatus } from '../hooks/useUserState'
import { useRedirect } from '../hooks/useRedirect'
import Modal from 'react-modal'
import StarIcon from '@mui/icons-material/Star'

Modal.setAppElement('#root')

export default function ProfilePage() {
  const navigate = useRedirect()
  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()
  const isPremium = userRole === 2
  const [user, setUser] = useState({})
  const [bio, setBio] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState(null)
  const [showArticles, setShowArticles] = useState(true)

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(360, 360, 360, 0.95)', // Less transparent, solid background
    },
  }
  const handleMenuClick = section => {
    setShowArticles(section === 'articles')
  }

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
  // console.log(user.picture)

  const [articles, setArticles] = useState([])
  const [bookmarkedArticleIds, setBookmarkArticleIds] = useState([]) // array of IDs
  const [bookmarkedArticles, setBookmarkArticles] = useState([]) // fetched articles

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
      // console.log('article Response-----------', articleResponse)
      setArticles(articleResponse.data.articles)
      setBookmarkArticleIds(response.data.bookmarks)
      // console.log(articleResponse.data)
      // console.log(bookmarkedArticles)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      try {
        const response = await axios.post('/articles/bookmarkedarticles', {
          ids: bookmarkedArticleIds, // use the array of IDs here
        })
        setBookmarkArticles(response.data)
      } catch (error) {
        console.error('Error fetching bookmarked articles:', error)
      }
    }

    if (bookmarkedArticleIds.length > 0) {
      // only fetch if there are bookmarked articles
      fetchBookmarkedArticles()
    }
  }, [bookmarkedArticleIds])

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
          <div className='premium-user'>
            {isPremium ? (
              <>
                <StarIcon /> Premium{' '}
              </>
            ) : null}
          </div>
          <button onClick={openModal}>Edit</button>

          <Modal
            className='profile-modal'
            style={customStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Profile Update Modal'
          >
            <div className='profile-update-name'>
              <label>Name:</label>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                className='profile-input-pic'
              />
            </div>
            <div className='profile-update-bio'>
              <label>Bio:</label>
              <textarea
                value={bio}
                placeholder='Tell us about you'
                onChange={e => setBio(e.target.value)}
              />
            </div>
            <div className='profile-update-pic'>
              <label>Profile Picture:</label>
              <input
                type='file'
                onChange={handlePictureChange}
                className='profile-input-pic'
              />
            </div>
            <div className='profile-modal-flex'>
              <button onClick={updateProfile}>Update</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </Modal>
        </div>
        {/* <p className='profile-email'>Email: {user.email}</p> */}
        <p className='profile-bio'>{user.bio}</p>
      </div>
      <div className='profile-menu-wrapper'>
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
            Bookmarked
          </div>
        </div>
        <div className='profile-content'>
          {showArticles ? (
            <ArticleComponent user={user} articles={articles} />
          ) : (
            <div>
              <AllArticleComponent user={user} articles={bookmarkedArticles} />
            </div>
            // <div>
            //   <div className='profile-update-name'>
            //     <label>Name:</label>
            //     <input
            //       type='text'
            //       value={name}
            //       onChange={e => setName(e.target.value)}
            //       className='profile-input-pic'
            //     />
            //   </div>
            //   <div className='profile-update-bio'>
            //     <label>Bio:</label>
            //     <textarea
            //       value={bio}
            //       placeholder='Tell us about you'
            //       onChange={e => setBio(e.target.value)}
            //     />
            //   </div>
            //   <div className='profile-update-pic'>
            //     <label>Profile Picture:</label>
            //     <input
            //       type='file'
            //       onChange={handlePictureChange}
            //       className='profile-input-pic'
            //     />
            //   </div>
            //   <button onClick={updateProfile}>Update</button>
            // </div>
          )}
        </div>
      </div>
    </div>
  )
}
