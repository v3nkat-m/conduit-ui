import axios from 'axios'
import MediumEditor from 'medium-editor'
import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.min.css'

export default function Edit() {
  // Get the article ID from the URL parameters
  const { id } = useParams()
  const articleId = id

  const [originalTitle, setOriginalTitle] = useState('')
  const [originalSubtitle, setOriginalSubtitle] = useState('')
  const [originalMainContent, setOriginalMainContent] = useState('')
  // Initialize state for the article data
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [mainContent, setMainContent] = useState('')

  // Initialize refs for the MediumEditors
  const titleEditorRef = useRef()
  const subtitleEditorRef = useRef()
  const mainContentEditorRef = useRef()

  useEffect(() => {
    axios.get(`/articles/article/${articleId}`).then(res => {
      const article = res.data
      // Initialize the MediumEditors with the existing article data
      const titleEditor = new MediumEditor(titleEditorRef.current)
      const subtitleEditor = new MediumEditor(subtitleEditorRef.current)
      const mainContentEditor = new MediumEditor(mainContentEditorRef.current, {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'quote'],
        },
        imageDragging: true,
      })

      // Set the initial content
      titleEditorRef.current.innerHTML = article.title
      subtitleEditorRef.current.innerHTML = article.subtitle
      mainContentEditorRef.current.innerHTML = article.content

      setOriginalTitle(article.title)
      setOriginalSubtitle(article.subtitle)
      setOriginalMainContent(article.content)

      // Subscribe to events to save changes to the component's state
      titleEditor.subscribe('editableInput', () => {
        setTitle(titleEditor.getContent())
      })
      subtitleEditor.subscribe('editableInput', () => {
        setSubtitle(subtitleEditor.getContent())
      })
      mainContentEditor.subscribe('editableInput', () => {
        setMainContent(mainContentEditor.getContent())
      })

      // Cleanup function
      return () => {
        titleEditor.destroy()
        subtitleEditor.destroy()
        mainContentEditor.destroy()
      }
    })
  }, [articleId])

  const handleSaveChanges = () => {
    // Save the changes to the server
    const finalTitle = title || originalTitle
    const finalSubtitle = subtitle || originalSubtitle
    const finalMainContent = mainContent || originalMainContent
    axios
      .put(`/articles/editarticle/${articleId}`, {
        title: finalTitle,
        subtitle: finalSubtitle,
        content: finalMainContent,
      })
      .then(() => {
        // Handle successful save
        // console.log('Changes saved successfully')
      })
      .catch(err => {
        // Handle error
        console.error('Error saving changes:', err)
      })
  }

  return (
    <div>
      <h1>Edit Article</h1>
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
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  )
}
