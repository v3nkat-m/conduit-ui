import React from 'react'
import black_logo from '../assets/black_logo.png'
import '../css/Logo.css'

export default function Logo() {
  return (
    <a href='/'>
      <img className='logo'
        src={black_logo}
        alt='logo'
      ></img>
    </a>
  )
}
