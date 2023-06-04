import React, { useContext } from 'react'
import '../css/ArticleComponent.css'
import { UserContext } from '../context/UserContext'
import { TagsContext } from '../context/TagsContext'
import { useFetchUser } from '../hooks/useFetchUser'
import LoneArticle from './LoneArticle.jsx'

export default function AllArticleComponent({ articles }) {
  const currentUserId = useContext(UserContext)
  const { user } = useFetchUser(currentUserId)
  const tags = useContext(TagsContext)
  // console.log('articles', articles)
  // console.log('Tags------', tags)
  // console.log(currentUserId)
  // console.log({ user })
  // console.log(articles)

  return (
    <div>
      {articles.map((article, index) => (
        <LoneArticle
          key={article._id}
          article={article}
          currentUserId={currentUserId}
          tags={tags}
          user={user}
        />
      ))}
    </div>
  )
}
