import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
// import { QueryClient, QueryClientProvider } from 'react-query'
// const queryClient = new QueryClient()

export default function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState({})
  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()
  const { user } = useFetchUser(article.userID)
  const [hasLiked, setHasLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [currentUser, setCurrentUser] = useState(null)
  const [hasBookmarked, bookmarkArticle, unbookmarkArticle, setHasBookmarked] =
    useBookmark(false, id)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(user) // Update the current user whenever the user data changes
  }, [user])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`articles/article/${id}`)
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
  }, [id])

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
  }, [article, currentUser])

  const likeArticle = async () => {
    try {
      await axios.put(`articles/like/${id}`)
      setHasLiked(true)
      setLikesCount(likesCount + 1)
    } catch (error) {
      console.error('Error liking article:', error)
    }
  }

  const unlikeArticle = async () => {
    try {
      await axios.put(`articles/unlike/${id}`)
      setHasLiked(false)
      setLikesCount(likesCount - 1)
    } catch (error) {
      console.error('Error unliking article:', error)
    }
  }

  console.log(useParams())
  console.log(user)

  if (isLoading) {
    return <div>Loading...</div>
  }
  const date = new Date(article.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`

  return (
    // <QueryClientProvider client={queryClient}>
    <div>
      {isCheckingLogin ? null : isLoggedIn ? <Header2 /> : <Header />}
      <div className='article-wrapper'>
        <div className='article-container'>
          <h1 dangerouslySetInnerHTML={{ __html: article.title }}></h1>
          <div className='article-flex-main'>
            <img src={user.picture} alt='profilepic' />
            <div className='article-flex-2'>
              <div className='article-flex-1'>
                <p>{article.author}</p>
                <p>Follow</p>
              </div>
              <p>{formattedDate}</p>
            </div>
            <div>
              {hasLiked ? (
                <ThumbUpAltIcon onClick={unlikeArticle} />
              ) : (
                <ThumbUpOffAltIcon onClick={likeArticle} />
              )}
              <p>{likesCount}</p>
            </div>
            <div>
              {hasBookmarked ? (
                <BookmarkAddedIcon onClick={unbookmarkArticle} />
              ) : (
                <BookmarkAddIcon onClick={bookmarkArticle} />
              )}
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
        </div>
      </div>
      <Comments articleId={id} />
    </div>
    // </QueryClientProvider>
  )
}
