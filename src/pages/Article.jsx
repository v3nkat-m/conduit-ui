import React, { useEffect, useState, useContext, useMemo } from 'react'
import api from '../axiosConfig'
import { useParams } from 'react-router-dom'
import '../css/Article.css'
import { useUserStatus } from '../hooks/useUserState'
import Header from '../components/Header'
import Header2 from '../components/Header2'
import { useFetchUser } from '../hooks/useFetchUser'
import Comments from '../components/Comments'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import useBookmark from '../hooks/useBookmark'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import useFollow from '../hooks/useFollow'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { UserContext } from '../context/UserContext'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'

// import { QueryClient, QueryClientProvider } from 'react-query'
// const queryClient = new QueryClient()

export default function Article() {
  const shareUrl = window.location.href
  const currentUserId = useContext(UserContext)
  // console.log('curresntUserId', currentUserId)
  const { id } = useParams()
  // console.log('id', id)
  const [article, setArticle] = useState({})
  const { isLoggedIn, isCheckingLogin } = useUserStatus()
  const { user } = useFetchUser(currentUserId)
  // console.log('user', user)
  // const { user } = useFetchUser(article.userID)
  const [hasLiked, setHasLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const userBookmarks = useMemo(() => user?.bookmarks || [], [user?.bookmarks])
  // console.log(userBookmarks)

  // const userFollowers = user?.followers || []
  // console.log('user followers', userFollowers)

  const userFollowings = useMemo(
    () => user?.followings || [],
    [user?.followings]
  )
  // console.log('user following', userFollowings)

  const isArticleBookmarked = userBookmarks.includes(article._id)
  // console.log('isArticleBookmarked', isArticleBookmarked)
  const [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked] =
    useBookmark(isArticleBookmarked, article._id)

  // console.log('article._id', article._id)
  // console.log(article.user)
  const isFollower = userFollowings.includes(article.user)
  // console.log('article.user', article.user)
  // console.log('isFollower', isFollower)
  // console.log('userFollowings', userFollowings)

  const [hasFollowed, followUser, unfollowUser, setHasFollowed] =
    useFollow(isFollower)

  useEffect(() => {
    // console.log('Checking if current user is following article user')
    setHasFollowed(userFollowings.includes(article.user))
    // console.log('Current user is following article user:', hasFollowed)
  }, [userFollowings, article.user, article, setHasFollowed])

  useEffect(() => {
    setHasBookmarked(userBookmarks.includes(article._id))
  }, [article, currentUserId, userBookmarks, setHasBookmarked])
  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`articles/article/${id}`)
        const article = response.data
        setArticle(article)

        // Check if the user has liked this article
        setHasLiked(article.likedBy.includes(user._id))

        // Set the likes count
        setLikesCount(article.likes)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    }

    fetchArticle()
  }, [id, user._id])

  //Preventing the rendering problem of bookmark annd like icons because of use of async function to fetch user data
  useEffect(() => {
    if (article.likedBy && currentUser) {
      setHasLiked(article.likedBy.includes(currentUser._id))
      setLikesCount(article.likes)
    }
  }, [article, currentUser])

  useEffect(() => {
    if (article.bookmarkedBy && currentUser) {
      setHasBookmarked(article.bookmarkedBy.includes(currentUser._id))
    }
  }, [article, currentUser, setHasBookmarked])

  const likeArticle = async () => {
    try {
      await api.put(`articles/like/${id}`)
      setHasLiked(true)
      setLikesCount(likesCount + 1)
    } catch (error) {
      console.error('Error liking article:', error)
    }
  }

  const unlikeArticle = async () => {
    try {
      await api.put(`articles/unlike/${id}`)
      setHasLiked(false)
      setLikesCount(likesCount - 1)
    } catch (error) {
      console.error('Error unliking article:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  const date = new Date(article.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`
  const isAuthor = currentUserId === article.userID

  // console.log('article.user.pic', article.user.picture)
  return (
    // <QueryClientProvider client={queryClient}>
    <div>
      {isCheckingLogin ? null : isLoggedIn ? <Header2 /> : <Header />}
      <div className='article-wrapper'>
        <div className='article-container'>
          <h1 dangerouslySetInnerHTML={{ __html: article.title }}></h1>
          <div className='article-flex-main'>
            <img src={article.user.picture} alt='profilepic' />
            <div className='article-flex-2'>
              <div className='article-flex-1'>
                <p>{article.author}</p>
              </div>
              <p>{formattedDate}</p>
            </div>
            <div className='article-follow-bookmark-flex'>
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
              {!isAuthor && currentUserId && (
                <button
                  onClick={() =>
                    hasBookmarked ? unbookmarkArticle() : bookmarkArticle()
                  }
                >
                  {hasBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                </button>
              )}
            </div>
            <div className='article-likes'>
              {isCheckingLogin ? null : isLoggedIn ? (
                <div>
                  {hasLiked ? (
                    <ThumbUpAltIcon onClick={unlikeArticle} />
                  ) : (
                    <ThumbUpOffAltIcon onClick={likeArticle} />
                  )}
                  <p>{likesCount}</p>
                </div>
              ) : null}
            </div>
            <div className='icons mobile-hide'>
              <FacebookShareButton url={shareUrl} quote={article.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={article.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={article.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
          <img src={article.featuredImage} alt='Featured' />
          <div
            dangerouslySetInnerHTML={{ __html: article.subtitle }}
            className='article-subtitle'
          />
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className='article-content'
          />
          <Comments articleId={id} />
        </div>
      </div>
    </div>
  )
}
