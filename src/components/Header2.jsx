import React from 'react'
import Logo from './Logo'
import '../css/Header2.css'
import SearchBar from './SearchBar'
import SimpleMenu from './SimpleMenu'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Header2() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout')
      navigate('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

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
          <div className='header2-mobilehide' onClick={handleLogout}>
            Log out
          </div>
          <div className='header2-pchide'>
            <SimpleMenu />
          </div>
        </div>
      </div>
    </div>
  )
}
