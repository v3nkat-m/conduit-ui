import React from 'react'
import '../css/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import CopyrightIcon from '@mui/icons-material/Copyright'

export default function Footer() {
  return (
    <div className='footer-wrapper'>
      <div className='footer-icon-container'>
        <FacebookIcon fontSize='large' />
        <TwitterIcon fontSize='large' />
        <InstagramIcon fontSize='large' />
      </div>
      <div className='footer-options-container'>
        <div>Explore</div>
        <div>Contact</div>
        <div>Privacy Policy</div>
        <div>Terms of Use</div>
        <div>Support</div>
      </div>
      <div className='footer-created-by'>
        <CopyrightIcon />
        Created by
        <a
          href='https://github.com/v3nkat-m'
          target='_blank'
          rel='noreferrer'
        >
          Venkat
        </a>
      </div>
    </div>
  )
}
