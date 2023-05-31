import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBookmark from '../hooks/useBookmark'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function LoneArticle({ article, currentUserId, tags, user }) {
  // extract bookmarks from user object
  const userBookmarks = user?.bookmarks || []
  console.log(userBookmarks)

  const isArticleBookmarked = userBookmarks.includes(article._id)
  console.log('isArticleBookmarked', isArticleBookmarked)
  const [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked] =
    useBookmark(isArticleBookmarked, article._id)

  useEffect(() => {
    setHasBookmarked(userBookmarks.includes(article._id))
  }, [article, currentUserId, userBookmarks])

  const date = new Date(article.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`
  const isAuthor = currentUserId === article.userID
  console.log(isAuthor)
  console.log('currentUserId', currentUserId)
  console.log('article id', article.userID)

  return (
    <div key={article._id} className='article-card'>
      <div className='article-flex1'>
        <img
          src={article.user.picture}
          className='article-userimg'
          alt='User'
        />
        <Link to={`/users/profile/${article.user._id}`}>
          <p>{article.user.name}</p>
        </Link>
        <p>{formattedDate}</p>
        {!isAuthor && currentUserId && <button>Follow</button>}
      </div>
      <div className='article-flex2'>
        <div className='article-subflex'>
          <h1 className='article-title'>
            <Link to={`/articles/${article._id}`}>
              {convertHtmlToPlainText(article.title)}
            </Link>
          </h1>
          <p className='article-subtitle'>
            {convertHtmlToPlainText(article.subtitle)}
          </p>
        </div>

        <img
          src={article.featuredImage}
          className='article-img'
          alt='Featured'
        />
        {!isAuthor && currentUserId && (
          <button onClick={hasBookmarked ? unbookmarkArticle : bookmarkArticle}>
            {hasBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          </button>
        )}
        <div>
          {article.tags.map(tagId => {
            const tag = tags.find(tag => String(tag._id) === String(tagId._id))
            if (tag) {
              return <span key={tag._id}>{tag.name}</span>
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
