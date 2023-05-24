import React from 'react'
import '../css/Banner.css'
import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div className='banner-container'>
      <h1 className='banner-h1'>Expand Horizons!</h1>
      <h3 className='banner-h3'>
        Explore stories,thoughts and expertise from people all around the world
      </h3>
      <Link
            to={'/auth/signup'}
            className='link'
          ><button className='banner-btn'>Start Reading</button></Link>
    </div>
  )
}
