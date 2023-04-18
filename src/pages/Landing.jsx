import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../css/Landing.css'

export default function Landing() {
  return (
    <div>
      <div className='landing-wrapper'>
        <Header />
        <Banner />
      </div>
      <Footer/>
    </div>
  )
}
