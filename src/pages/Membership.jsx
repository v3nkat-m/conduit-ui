import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../css/Memebership.css'
import Table from '../components/Table'
import '../css/Review.css'
import ReviewSection from '../components/ReviewSection'
import Footer from '../components/Footer'
import axios from 'axios'
import Header2 from '../components/Header2'

export default function Membership() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [isCheckingLogin, setIsCheckingLogin] = useState(true)

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('/auth/userstatus', {
          withCredentials: true,
        })
        console.log('User response', response.data)
        setIsLoggedIn(response.data.isLoggedIn)
        setUserRole(response.data.userRole)
      } catch (error) {
        console.error('Error fetching user status', error)
      } finally {
        setIsCheckingLogin(false)
      }
    }
    fetchUserStatus()
  }, [])
  const NotLoggedInDiv = () => (
    <>
      <p className='membership-para'>
        To upgrade to <span className='membership-span2'>Conduit+</span> you
        need an account. Join or sign in to continue
      </p>
      <button className='membership-btn'>Join Conduit Now</button>
      <p className='membership-signin'>
        Already have a Conduit account? <a href='/login'>Sign In</a>
      </p>
    </>
  )
  const LoggedInDiv = () => (
    <>
      <p className='membership-para'>
        To upgrade to <span className='membership-span2'>Conduit+</span> just
        pay 1$ per month.
      </p>
      <button className='membership-btn'>Join Conduit+</button>
    </>
  )
  return (
    <div>
      <div className='membership-wrapper'>
        {!isLoggedIn && !isCheckingLogin ? <Header /> : <Header2 />}
        <div className='membership-container'>
          <h1 className='membership-header'>
            Upgrade to <span className='membership-span'>Conduit+</span> and
            amplify your stories.
          </h1>
          {!isLoggedIn && !isCheckingLogin ? (
            <NotLoggedInDiv />
          ) : (
            <LoggedInDiv />
          )}
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
