import React from 'react'
import Logo from './Logo'
import '../css/Header2.css'
import SearchBar from './SearchBar'
import SimpleMenu from './SimpleMenu'
import { Link } from 'react-router-dom'

export default function Header2() {
  return (
    <div className='header2-mainwrapper'>
      <div className='header2-container'>
        <div className='header2-wrapper1'>
          <div className='header2-logo'>
            <Logo />
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
        <div className='header2-wrapper2'>
          <Link to={'/write'} className='link'>
            <div className='header2-mobilehide'>Write</div>
          </Link>
          <Link to={'/membership'} className='link'>
            <div className='header2-mobilehide'>Membership</div>
          </Link>
          <Link to={'/profile'} className='link'>
            <div className='header2-mobilehide'>Profile</div>
          </Link>
          <div className='header2-mobilehide'>Log out</div>
          <div className='header2-pchide'>
            <SimpleMenu />
          </div>
        </div>
      </div>
    </div>
  )
}
