import React, { useState } from 'react'
import axios from 'axios'
import '../css/Login.css'
import Logo from '../components/Logo'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default function ChangePassword() {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await axios.post('/auth/changepassword', {
        email,
        oldPassword,
        newPassword,
      })

      if (response.data.success) {
        alert('Password changed successfully')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to change password')
    }
  }

  return (
    <div className='login-wrapper'>
      <Logo />
      <div className='login-container'>
        <div className='login-header'>Change Password</div>
      </div>
      <div>
        <div>
          <div className='login-text'>Email address</div>
          <input
            type='text'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='Enter your mail'
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Enter your mail')}
            className='login-input'
          />
        </div>
        <div>
          <div className='login-text'>Old Password</div>
          <input
            type='password'
            value={oldPassword}
            onChange={event => setOldPassword(event.target.value)}
            placeholder='Enter your old password'
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Enter your old password')}
            className='login-input'
          />
        </div>
        <div>
          <div className='login-text'>New Password</div>
          <input
            type='password'
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            placeholder='Enter your new password'
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Enter your new password')}
            className='login-input'
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
