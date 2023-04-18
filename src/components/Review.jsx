import React from 'react'
import '../css/Review.css'

export default function Review(props) {
  return (
    <div className='review'>
      <div className='review-profile'>
        <div className='review-img-wrapper'>
          <img
            className='review-img'
            src={props.profilePic}
            alt={props.name}
          />
        </div>
        <div>
          <div className='name'>{props.name}</div>
          <div>{props.date}</div>
        </div>
      </div>
      <div className='review-content'>
        <p>{props.content}</p>
      </div>
    </div>
  )
}
