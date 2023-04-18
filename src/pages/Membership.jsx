import React from 'react'
import Header from '../components/Header'
import '../css/Memebership.css'
import Table from '../components/Table'
import '../css/Review.css'
import ReviewSection from '../components/ReviewSection'
import Footer from '../components/Footer'

export default function Membership() {
  return (
    <div>
      <div className='membership-wrapper'>
        <Header />
        <div className='membership-container'>
          <h1 className='membership-header'>
            Upgrade to <span className='membership-span'>Conduit+</span> and
            amplify your stories.
          </h1>
          <p className='membership-para'>
            To upgrade to <span className='membership-span2'>Conduit+</span> you
            need an account. Join or sign in to continue
          </p>
          <button className='membership-btn'>Join Conduit Now</button>
          <p className='membership-signin'>
            Already have a Conduit account? <a href='/login'>Sign In</a>
          </p>
        </div>
      </div>
      <div className='membership-container2'>
        <div className='membership-wrapper2'>
          <h1 className='membership-header2'>
            Why upgrade to <span className='membership-span'>Conduit+</span>
          </h1>
          <p className='membership-para2'>
            Conduit+ Members receive increased earnings, a Conduit+ Badge, first
            access to new features, and more.
          </p>
          <Table />
          <p className='membership-signin'>
            Creator feedback significantly shaped these features. If you would
            like to suggest a new feature,please{' '}
            <a href='mailto:venka7m@gmail.com'>contact us</a>
          </p>
        </div>
      </div>
      <div className='reviewsection-wrapper'>
        <h1 className='membership-header'>
          Creators are our <span className='membership-partners'>partners</span>
        </h1>
        <p className='creators-para'>
          Over the past few years, Conduit has grown because of the support of
          our creators. Discover why they choose Conduit to tell their stories.
        </p>
        <ReviewSection />
      </div>
        <Footer />

    </div>
  )
}
