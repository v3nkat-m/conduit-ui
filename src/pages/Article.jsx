import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Article() {
  const { id } = useParams()
  const [article, setArticle] = useState({})

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`articles/article/${id}`)
        setArticle(response.data)
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    }
    fetchArticle()
  }, [id])

  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.subtitle }} />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <img src={article.featuredImage} alt='Featured' />
    </div>
  )
}
