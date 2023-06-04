import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Header2 from '../components/Header2'
import Header from '../components/Header'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.min.css'
import MediumEditor from 'medium-editor'
import { useUserStatus } from '../hooks/useUserState'
import Select from 'react-select'

import '../css/write.css'
export default function Write() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [mainContent, setMainContent] = useState('')
  const [picture, setPicture] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const [tags, setTags] = useState([])

  const { isLoggedIn, userRole } = useUserStatus()

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

    const fetchTags = async () => {
      try {
        const res = await axios.get('tags/tags')
        setTags(res.data)
      } catch (err) {
        console.error('Failed to fetch tags:', err)
      }
    }
    fetchTags()
    // Cleanup function
    return () => {
      titleEditor.destroy()
      subtitleEditor.destroy()
      mainContentEditor.destroy()
    }

    fetchTags()
  }, [])

  const handleTagChange = selectedOptions => {
    setSelectedTag(selectedOptions.map(option => option.label))
  }

  const handlePublish = async () => {
    let articleId = null
    // console.log('articleId before:', articleId)
    try {
      // Create the article first
      const response = await axios.post('/articles/createarticle', {
        title,
        subtitle,
        content: mainContent,
        tags: selectedTag,
      })
      // console.log(response.data)
      articleId = response.data._id
      // console.log('response.data:', response.data)
      // console.log('articleID after:', articleId)

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

        // console.log(imageUploadResponse.data)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }
  const handlePictureChange = e => {
    // console.log('e.target-------------------------', e.target.files)
    setPicture(e.target.files[0])
  }

  return (
    <>
      <div>{isLoggedIn ? <Header2 /> : <Header />}</div>
      <div className='write-wrapper'>
        <div>
          <label className='write-label'>Title:</label>
          <div ref={titleEditorRef}></div>
        </div>
        <div>
          <label className='write-label'>Subtitle:</label>
          <div ref={subtitleEditorRef}></div>
        </div>
        <div>
          <label className='write-label'>Main Content:</label>
          <div ref={mainContentEditorRef}></div>
        </div>
        <div>
          <label className='write-label'>Featured Image:</label>
          <br />
          <input
            type='file'
            onChange={handlePictureChange}
            className='write-input'
          />
        </div>
        <div>
          <label className='write-label'>Tags:</label>
          <Select
            className='write-margin'
            isMulti
            options={tags.map(tag => ({ label: tag.name, value: tag._id }))}
            onChange={handleTagChange}
          />
        </div>
        <div>
          <button onClick={handlePublish} className='write-btn'>
            Publish
          </button>
        </div>
      </div>
    </>
  )
}
