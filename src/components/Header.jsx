import React from 'react'
import Logo from './Logo'
import '../css/Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header-wrapper'>
      <header className='header-container'>
        <Link
          to={'/'}
          className='link'
        >
          <Logo />
        </Link>
        <div className='header-menu'>
          <Link
            to={'/membership'}
            className='link'
          >
            <h3 className='header-hide-mobile'>Conduit+</h3>
          </Link>
          <Link
            to={'/login'}
            className='link'
          >
            <h3>Sign In</h3>
          </Link>
          <Link
            to={'/login'}
            className='link'
          >
            <button className='header-button header-hide-btn'>
              <h3>Get Started</h3>
            </button>
          </Link>
        </div>
      </header>
    </div>
  )
}
