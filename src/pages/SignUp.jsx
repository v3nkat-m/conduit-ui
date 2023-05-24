import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import '../css/Signup.css'
import Logo from '../components/Logo'
import Footer from '../components/Footer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  function handleSignup(){
    axios.post('http://localhost:3000/auth/signup',{email,password})
    .then((res)=>{
      console.log(res.data)
      toast.success('User Created.Kindly proceed to login')
    })
    .catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message);
    })
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
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter your mail'
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Enter your mail')}
              />
            </div>
            <div>
              <div className='signup-space'>Create a password</div>
              <input
                type='password'
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
        <button className='signup-button2' onClick={handleSignup}>Sign up</button>
        <div>Have an account? <a href='/auth/login'>Log in</a></div>
        <div className='signup-footer'></div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}
