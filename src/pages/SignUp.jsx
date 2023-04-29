import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import '../css/Signup.css'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

export default function SignUp() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleMailChange(event) {
    setMail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  return (
    <div>
      <div className='signup-main-wrapper'>
        <div className='signup-logo'>
          <Logo />
        </div>

        <div className='signup-header'>Sign up for free to start reading.</div>
        <div className='signup-wrapper'>
          <button className='signup-button fb'>
            <FacebookIcon />
            <div>Sign up with Facebook</div>
          </button>
          <button className='signup-button google'>
            <GoogleIcon />
            <div>Sign up with Google</div>
          </button>
          <div className='signup-center'>or</div>
          <div>
            <div>
              <div className='signup-space'>What's your email?</div>
              <input
                value={mail}
                onChange={handleMailChange}
                placeholder='Enter your mail'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Enter your mail')}
              />
            </div>
            <div>
              <div className='signup-space'>Create a password</div>
              <input
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter a password'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Enter your password')}
              />
            </div>
            <div>
              <div className='signup-space'>What should we call you?</div>
              <input
                value={name}
                onChange={handleNameChange}
                placeholder='Enter your name'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Enter your name')}
              />
              <div className='signup-small'>*This appears on your profile.</div>
            </div>
          </div>
        </div>
        <button className='signup-button2'>Sign up</button>
        <div>Have an account? Log in</div>
        <div className='signup-footer'></div>
      </div>
      <Footer />
    </div>
  )
}
