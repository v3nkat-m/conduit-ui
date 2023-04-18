import React from 'react'
import { useRouteError } from 'react-router-dom'
import '../css/ErrorPage.css'
import monkey from '../assets/monkey.jpg'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className='error-wrapper'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src={monkey} alt='error'></img>
    </div>
  )
}
