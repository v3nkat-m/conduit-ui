import React from 'react'
import { Link } from 'react-router-dom'
import '../css/search.css'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function SearchArticle({ article }) {
  return (
    <div>
      <div key={article.objectID} className='article-card'>
        <div className='article-flex1'>
          <Link to={`/users/profile/${article.userID}`}>
            <p className='search-author'>{article.name}</p>
          </Link>
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
    </div>
  )
}
