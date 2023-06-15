import React, { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBookmark from '../hooks/useBookmark'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import useFollow from '../hooks/useFollow'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function LoneArticle({ article, currentUserId, tags, user }) {
  const userBookmarks = useMemo(() => user?.bookmarks || [], [user?.bookmarks])
  // console.log(userBookmarks)

  const userFollowings = useMemo(
    () => user?.followings || [],
    [user?.followings]
  )
  // console.log('user followings', userFollowings)

  const isArticleBookmarked = userBookmarks.includes(article._id)
  // console.log('isArticleBookmarked', isArticleBookmarked)
  const [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked] =
    useBookmark(isArticleBookmarked, article._id)
  const isFollower = userFollowings.includes(article.user._id)
  // console.log('article.user', article.user._id)

  const [hasFollowed, followUser, unfollowUser, setHasFollowed] =
    useFollow(isFollower)

  useEffect(() => {
    // console.log('Checking if current user is following article user')
    setHasFollowed(userFollowings.includes(article.user._id))
    // console.log('Current user is following article user:', hasFollowed)
  }, [userFollowings, article.user._id, article, setHasFollowed])
  useEffect(() => {
    setHasBookmarked(userBookmarks.includes(article._id))
  }, [article, currentUserId, userBookmarks, setHasBookmarked])

  const date = new Date(article.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`
  const isAuthor = currentUserId === article.userID
  // console.log(isAuthor)
  // console.log('currentUserId', currentUserId)
  // console.log('article id', article.userID)

  return (
    <div key={article._id} className='article-card'>
      <div className='article-bookmark-flex'>
        <div className='article-flex1'>
          <Link to={`/users/profile/${article.user._id}`}>
            <img
              src={article.user.picture}
              className='article-userimg'
              alt='User'
            />
          </Link>
          <Link to={`/users/profile/${article.user._id}`}>
            <p className='article-username'>{article.user.name}</p>
          </Link>
          <p className='article-date'>{formattedDate}</p>
          {!isAuthor && currentUserId && (
            <button
              className='article-follow-btn'
              onClick={() =>
                hasFollowed
                  ? unfollowUser(currentUserId, article.userID)
                  : followUser(currentUserId, article.userID)
              }
            >
              {hasFollowed ? (
                <div className='article-followed-btn'>
                  <HowToRegIcon /> Followed
                </div>
              ) : (
                <div className='article-followed-btn'>
                  <PersonAddAltIcon /> Follow
                </div>
              )}
            </button>
          )}
        </div>
        <div>
          {' '}
          {!isAuthor && currentUserId && (
            <button
              onClick={hasBookmarked ? unbookmarkArticle : bookmarkArticle}
            >
              {hasBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
            </button>
          )}
        </div>
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
          <p className='article-content card'>
            {convertHtmlToPlainText(article.content)}
          </p>
        </div>

        <img
          src={article.featuredImage}
          className='article-img'
          alt='Featured'
        />
      </div>
      <div className='article-tags'>
        {article.tags.map(tagId => {
          const tag = tags.find(tag => String(tag._id) === String(tagId._id))
          if (tag) {
            return (
              <span key={tag._id} className='article-tag'>
                {tag.name}
              </span>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
