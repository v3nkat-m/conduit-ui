import React, { useState } from 'react'
import Logo from '../components/Logo'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import '../css/Login.css'

export default function Login() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleMailChange(event) {
    setMail(event.target.value)
  }

  return (
    <div className='login-wrapper'>
      <Logo />
      <div className='login-container'>
        <div className='login-header'>To continue, log in to Conduit.</div>
        <button className='login-flex-btn'>
          <FacebookIcon fontSize='large' />
          <div>CONTINUE WITH FACEBOOK</div>
        </button>
        <button className='login-flex-btn'>
          <GoogleIcon fontSize='large' />
          <div>CONTINUE WITH GOOGLE</div>
        </button>
      </div>
      <div className='login-or'>OR</div>
      <div>
        <div>
          <div className='login-text'>Email address</div>
          <input
            type='text'
            value={mail}
            onChange={handleMailChange}
            placeholder = 'Enter your mail'
            onFocus = {(e)=> e.target.placeholder=''}
            onBlur = {(e)=>e.target.placeholder = 'Enter your mail'}
            className='login-input'
          />
        </div>
        <div>
          <div className='login-text'>Password</div>
          <input
            type='text'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter your password'
            onFocus={(e)=>e.target.placeholder=''}
            onBlur={(e)=>e.target.placeholder='Enter your password'}
            className='login-input'
          />
        </div>
      </div>
      <a href='/'>Forgot your password?</a>
      <div>
        <div>
          <div>Remember me</div>
        </div>
        <button>LOG IN</button>
      </div>
    </div>
  )
}
