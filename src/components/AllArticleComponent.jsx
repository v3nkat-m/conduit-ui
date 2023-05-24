import React from 'react'
import '../css/ArticleComponent.css'
import { Link } from 'react-router-dom'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function AllArticleComponent({ articles }) {
  return (
    <div>
      {articles.map((article, index) => {
        const date = new Date(article.date)
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          '0'
        )}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${date.getFullYear()}`

        return (
          <div key={article._id} className='article-card'>
            <div className='article-flex1'>
              <img src={article.user.picture} className='article-userimg'></img>
              <p>{article.user.name}</p>
              <p>{formattedDate}</p>
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

              <img src={article.featuredImage} className='article-img'></img>
            </div>
          </div>
        )
      })}
    </div>
  )
}
