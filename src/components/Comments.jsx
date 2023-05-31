import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    console.log('useEffect called') // <-- Add this line
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/articles/comments/${articleId}`
        )
        console.log('response.data', response.data)
        setComments(response.data || [])
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [articleId])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/comments/comments',
        { content: comment, articleId },
        { withCredentials: true } // Make sure to send cookies
      )
      console.log('response.data', response.data)
      setComments([...comments, response.data])
      setComment('')
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  return (
    <div>
      <h1>Comments</h1>
      {comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>{comment.publicationDate}</p>
          <p>{comment.commenter.name}</p>
          {comment.commenter.picture && (
            <img src={comment.commenter.picture} alt='Profile' />
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Comments
