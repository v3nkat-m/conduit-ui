import React, { useState } from 'react'
import api from '../axiosConfig'
import '../css/Login.css'
import Logo from '../components/Logo'
// axios.defaults.baseURL = 'https://main--inquisitive-cocada-92d34c.netlify.app/'
api.defaults.withCredentials = true

export default function ChangePassword() {
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await api.post('/auth/changepassword', {
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
    <div>
      <div className='login-logo'>
        <Logo />
      </div>
      <div className='login-color-wrapper'>
        <div className='login-wrapper'>
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
            <button onClick={handleSubmit} className='login-pwd-btn'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
