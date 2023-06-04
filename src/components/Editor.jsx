import React, { useRef, useEffect } from 'react'
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.min.css'

export default function Editor() {
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
        buttons: ['bold', 'italic', 'underline', 'anchor', 'quote', 'image'],
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
      // console.log('Title:', content)
    })

    subtitleEditor.subscribe('editableInput', (event, editable) => {
      const content = subtitleEditor.getContent()
      // console.log('Subtitle:', content)
    })

    mainContentEditor.subscribe('editableInput', (event, editable) => {
      const content = mainContentEditor.getContent()
      // console.log('Main Content:', content)
    })

    return () => {
      titleEditor.destroy()
      subtitleEditor.destroy()
      mainContentEditor.destroy()
    }
  }, [])

  return (
    <div>
      <div ref={titleEditorRef} contentEditable='true'></div>
      <div ref={subtitleEditorRef} contentEditable='true'></div>
      <div ref={mainContentEditorRef} contentEditable='true'></div>
    </div>
  )
}
