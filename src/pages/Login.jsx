import React, { useState, useEffect, useRef } from 'react'
import Logo from '../components/Logo'
import GoogleIcon from '@mui/icons-material/Google'
import '../css/Login.css'
import api from '../axiosConfig'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const BASE_URL = 'http://localhost:3000'
// axios.defaults.baseURL = 'https://main--inquisitive-cocada-92d34c.netlify.app/'
api.defaults.withCredentials = true

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const containerRef = useRef(null)

  function handleLogin() {
    setErrorMessage('')

    api
      .post('/auth/login', {
        email: email,
        password: password,
      })
      .then(response => {
        // console.log(response.data.message)
        window.location.href =
          'https://main--inquisitive-cocada-92d34c.netlify.app/'
      })
      .catch(error => {
        // console.log(error.response.data.message)
        setErrorMessage(error.response.data.message)
      })
  }

  function handleGoogleRedirect() {
    window.location.href = `${BASE_URL}/auth/google`
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleLogin()
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, { containerId: 'container' })
    }
  }, [errorMessage])

  return (
    <div className='login-main-wrapper'>
      <div className='login-logo'>
        <Logo />
      </div>
      <div className='login-color-wrapper'>
        <div className='login-wrapper'>
          <div className='login-container'>
            <div className='login-header'>To continue, log in to Conduit.</div>
            {/* <button className='login-flex-btn'>
              <FacebookIcon fontSize='large' />
              <div>CONTINUE WITH FACEBOOK</div>
            </button> */}
            <button className='login-flex-btn' onClick={handleGoogleRedirect}>
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
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter your mail'
                onFocus={e => (e.target.placeholder = '')}
                onBlur={e => (e.target.placeholder = 'Enter your mail')}
                className='login-input'
              />
            </div>
            <div>
              <div className='login-text'>Password</div>
              <input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                onFocus={e => (e.target.placeholder = '')}
                onBlur={e => (e.target.placeholder = 'Enter your password')}
                className='login-input'
              />
            </div>
          </div>
          <a href='/auth/change-password'>Forgot your password?</a>
          <div>
            <button onClick={handleSubmit} className='login-btn'>
              LOG IN
            </button>
          </div>
          <ToastContainer ref={containerRef} containerId='container' />
        </div>
      </div>
    </div>
  )
}
