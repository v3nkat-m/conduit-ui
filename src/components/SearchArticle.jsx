import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBookmark from '../hooks/useBookmark'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function SearchArticle({ article }) {
  // extract bookmarks from user object
  //   const userBookmarks = user?.bookmarks || []
  //   console.log(userBookmarks)

  //   const isArticleBookmarked = userBookmarks.includes(article._id)
  //   console.log('isArticleBookmarked', isArticleBookmarked)
  //   const [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked] =
  //     useBookmark(isArticleBookmarked, article._id)

  //   useEffect(() => {
  //     setHasBookmarked(userBookmarks.includes(article._id))
  //   }, [article, currentUserId, userBookmarks])

  const date = new Date(article.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`
  //   const isAuthor = currentUserId === article.userID
  //   console.log(isAuthor)
  //   console.log('currentUserId', currentUserId)
  console.log('article id', article.userID)

  return (
    <div key={article.objectID} className='article-card'>
      <div className='article-flex1'>
        <Link to={`/users/profile/${article.userID}`}>
          <p>{article.name}</p>
        </Link>
        <p>{formattedDate}</p>
      </div>
      <div className='article-flex2'>
        <div className='article-subflex'>
          <h1 className='article-title'>
            <Link to={`/articles/${article.objectID}`}>
              {convertHtmlToPlainText(article.title)}
            </Link>
          </h1>
          <p className='article-subtitle'>
            {convertHtmlToPlainText(article.subtitle)}
          </p>
        </div>
      </div>
    </div>
  )
}
