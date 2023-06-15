import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useFetchUser } from '../hooks/useFetchUser'
import { useUserStatus } from '../hooks/useUserState'

import '../css/Comments.css' // Import CSS file for styling

const addReplyToComments = (comments, reply, parentId) => {
  return comments.map(comment => {
    if (comment._id === parentId) {
      return { ...comment, replies: [...(comment.replies || []), reply] }
    }

    if (Array.isArray(comment.replies)) {
      return {
        ...comment,
        replies: addReplyToComments(comment.replies, reply, parentId),
      }
    }

    return comment
  })
}

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [reply, setReply] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const currentUserId = useContext(UserContext)
  const { user } = useFetchUser(currentUserId)
  const { isLoggedIn, isCheckingLogin } = useUserStatus()

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/articles/comments/${articleId}`)
        setComments(response.data || [])
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [articleId])

  const handleSubmit = async (e, parentCommentId) => {
    e.preventDefault()
    const content = parentCommentId ? reply : comment
    try {
      const response = await axios.post(
        '/comments/comments',
        { content, articleId, parentCommentId },
        { withCredentials: true }
      )

      if (parentCommentId) {
        setComments(
          addReplyToComments(comments, response.data, parentCommentId)
        )
      } else {
        setComments([...comments, response.data])
      }

      setComment('')
      setReply('')
      setReplyingTo(null)
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }

  const handleCancel = () => {
    setReply('')
    setReplyingTo(null)
  }
  const handleDelete = async commentId => {
    try {
      const response = await axios.delete(`comments/comments/${commentId}`, {
        withCredentials: true,
      })
      if (response.status === 200) {
        setComments(comments.filter(comment => comment._id !== commentId))
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const renderComment = (comment, depth = 0) => {
    // console.log(comment.replies)
    // console.log(user._id)
    // console.log(comment.commenter)
    return (
      <div className='comment' key={comment._id}>
        <div className='comment-content'>
          <div className='comment-author'>
            {comment.commenter && comment.commenter.picture && (
              <img src={comment.commenter.picture} alt='Profile' />
            )}
            {comment.commenter && comment.commenter.name && (
              <p>{comment.commenter.name}</p>
            )}
            <p>{new Date(comment.publicationDate).toLocaleString()}</p>
          </div>
          <p>{comment.content}</p>
        </div>
        <div className='comment-delete-flex'>
          <div>
            {isCheckingLogin ? null : isLoggedIn &&
              user._id === comment.commenter._id ? (
              <button onClick={() => handleDelete(comment._id)}>Delete</button>
            ) : null}
          </div>

          {depth < 1 && (
            <div>
              {isCheckingLogin ? null : isLoggedIn ? (
                <div className='comment-actions'>
                  <button onClick={() => setReplyingTo(comment._id)}>
                    Reply
                  </button>
                </div>
              ) : null}
            </div>
          )}
          {replyingTo === comment._id && (
            <form onSubmit={e => handleSubmit(e, comment._id)}>
              <label>
                Reply:
                <input
                  type='text'
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  required
                />
              </label>
              <div className='comment-form-actions'>
                <button type='submit'>Submit Reply</button>
                <button type='button' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <div className='comment-replies'>
          {Array.isArray(comment.replies) &&
            comment.replies.map(reply => renderComment(reply, depth + 1))}
        </div>
      </div>
    )
  }

  return (
    <div className='comments-container'>
      <h1>Comments</h1>
      {isCheckingLogin ? null : isLoggedIn ? (
        <form onSubmit={e => handleSubmit(e, null)} className='comment-form'>
          <label>
            <input
              placeholder='What are your thoughts?'
              type='text'
              className='comment-input'
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
          </label>
          <button type='submit' className='comment-submit-btn'>
            Publish
          </button>
        </form>
      ) : null}
      {comments.map(renderComment)}
    </div>
  )
}

export default Comments
