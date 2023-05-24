import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Editor from '../components/Editor'
import Header2 from '../components/Header2'
import Header from '../components/Header'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.min.css'
import MediumEditor from 'medium-editor'

export default function Write() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [mainContent, setMainContent] = useState('')
  const [picture, setPicture] = useState(null)

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
      }
    }
    fetchUserStatus()
  }, [])

  const titleEditorRef = useRef()
  const subtitleEditorRef = useRef()
  const mainContentEditorRef = useRef()

  useEffect(() => {
    const titleEditor = new MediumEditor(titleEditorRef.current, {
      placeholder: {
        text: 'Enter title...',
        hideOnClick: true,
      },
    })

    const subtitleEditor = new MediumEditor(subtitleEditorRef.current, {
      placeholder: {
        text: 'Enter subtitle...',
        hideOnClick: true,
      },
    })

    const mainContentEditor = new MediumEditor(mainContentEditorRef.current, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'quote'],
      },
      placeholder: {
        text: 'Start writing...',
        hideOnClick: true,
      },
      imageDragging: true,
    })

    // Subscribe to events
    titleEditor.subscribe('editableInput', (event, editable) => {
      const content = titleEditor.getContent()
      setTitle(content)
    })

    subtitleEditor.subscribe('editableInput', (event, editable) => {
      const content = subtitleEditor.getContent()
      setSubtitle(content)
    })

    mainContentEditor.subscribe('editableInput', (event, editable) => {
      const content = mainContentEditor.getContent()
      setMainContent(content)
    })

    return () => {
      titleEditor.destroy()
      subtitleEditor.destroy()
      mainContentEditor.destroy()
    }
  }, [])

  const handlePublish = async () => {
    let articleId = null
    console.log('articleId before:', articleId)
    try {
      // Create the article first
      const response = await axios.post('/articles/createarticle', {
        title,
        subtitle,
        content: mainContent,
      })
      console.log(response.data) // This is the created article
      articleId = response.data._id // Store the created article's ID
      console.log('response.data:', response.data)
      console.log('articleID after:', articleId)

      // Redirect or show success message to the user
    } catch (error) {
      console.error('Error creating article:', error)
      // Show error message to the user
    }

    // After successfully creating the article, upload the image
    if (picture) {
      try {
        const imageFormData = new FormData()
        imageFormData.append('image', picture)
        imageFormData.append('articleId', articleId)

        const imageUploadResponse = await axios.post(
          'articles/uploadImage',
          imageFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        console.log(imageUploadResponse.data) // This is the uploaded image data
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }
  const handlePictureChange = e => {
    console.log('e.target-------------------------', e.target.files)
    setPicture(e.target.files[0])
  }

  return (
    <div>
      {isLoggedIn ? <Header2 /> : <Header />}
      <h1>Write Page</h1>
      <div>
        <label>Title:</label>
        <div ref={titleEditorRef}></div>
      </div>
      <div>
        <label>Subtitle:</label>
        <div ref={subtitleEditorRef}></div>
      </div>
      <div>
        <label>Main Content:</label>
        <div ref={mainContentEditorRef}></div>
      </div>
      <div>
        <label>Featured Image:</label>
        <input type='file' onChange={handlePictureChange} />
      </div>
      <div>
        <button onClick={handlePublish}>Publish</button>
      </div>
    </div>
  )
}
