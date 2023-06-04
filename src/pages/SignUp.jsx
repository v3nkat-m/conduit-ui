import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google'
import '../css/Signup.css'
import Logo from '../components/Logo'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  function handleSignup() {
    axios
      .post('http://localhost:3000/auth/signup', { email, password })
      .then(res => {
        // console.log(res.data)
        toast.success('User Created.Kindly proceed to login')
      })
      .catch(err => {
        // console.log(err)
        toast.error(err.response.data.message)
      })
  }
  function handleGoogleRedirect() {
    window.location.href = 'http://localhost:3000/auth/google'
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  return (
    <div>
      <div className='signup-logo'>
        <Logo />
      </div>
      <div className='main-wrapper'>
        <div className='signup-color-wrapper'>
          <div className='signup-header'>
            Sign up for free to start reading.
          </div>
          <div className='signup-wrapper'>
            {/* <button className='signup-button'>
              <FacebookIcon />
              <div>SIGN UP WITH FACEBOOK</div>
            </button> */}
            <button className='signup-button' onClick={handleGoogleRedirect}>
              <GoogleIcon />
              <div>SIGN UP WITH GOOGLE</div>
            </button>
            <div className='signup-center'>or</div>
            <div>
              <div>
                <div className='signup-space'>What's your email?</div>
                <input
                  className='signup-input'
                  value={email}
                  onChange={handleEmailChange}
                  placeholder='Enter your mail'
                  onFocus={e => (e.target.placeholder = '')}
                  onBlur={e => (e.target.placeholder = 'Enter your mail')}
                />
              </div>
              <div>
                <div className='signup-space'>Create a password</div>
                <input
                  className='signup-input'
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Enter a password'
                  onFocus={e => (e.target.placeholder = '')}
                  onBlur={e => (e.target.placeholder = 'Enter your password')}
                />
              </div>
              <div>
                <div className='signup-space'>What should we call you?</div>
                <input
                  className='signup-input'
                  value={name}
                  onChange={handleNameChange}
                  placeholder='Enter your name'
                  onFocus={e => (e.target.placeholder = '')}
                  onBlur={e => (e.target.placeholder = 'Enter your name')}
                />
                <div className='signup-small'>
                  *This appears on your profile.
                </div>
              </div>
            </div>
          </div>
          <button className='signup-button2' onClick={handleSignup}>
            Sign up
          </button>
          <div className='signup-login-span-div'>
            Have an account?{' '}
            <a href='/auth/login' className='signup-login-span'>
              Log in
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
