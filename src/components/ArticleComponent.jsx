import React, { useState } from 'react'
import '../css/ArticleComponent.css'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'

function convertHtmlToPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function ArticleComponent({ user, articles }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentArticleId, setCurrentArticleId] = useState(null)

  const handleClick = (event, articleId) => {
    setCurrentArticleId(articleId)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleClose()
  }

  const handleDelete = async () => {
    axios.delete(`/articles/deletearticle/${currentArticleId}`)
    handleClose()
  }

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
              {/* <img src={user.picture} className='article-userimg'></img> */}
              {/* <p>{user.name}</p> */}
              <p>{formattedDate}</p>
              <MoreHorizIcon
                onClick={event => handleClick(event, article._id)}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>
                  <Link to={`/edit/${currentArticleId}`}>Edit</Link>
                </MenuItem>

                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
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
            {/* <p>{convertHtmlToPlainText(article.content)}</p> */}
          </div>
        )
      })}
    </div>
  )
}
