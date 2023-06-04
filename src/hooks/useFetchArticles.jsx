import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetchArticles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('articles/allarticles')
        // console.log(response.data)
        setArticles(response.data)
      } catch (error) {
        // console.log(error)
      }
    }

    fetchArticles()
  }, [])

  return { articles }
}
