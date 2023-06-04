import React, { useContext, useState, useEffect } from 'react'
import Header from '../components/Header'
import '../css/Memebership.css'
import Table from '../components/Table'
import '../css/Review.css'
import ReviewSection from '../components/ReviewSection'
import Footer from '../components/Footer'
import Header2 from '../components/Header2'
import axios from 'axios'
import { useUserStatus } from '../hooks/useUserState'
import { loadStripe } from '@stripe/stripe-js'
import { useFetchUser } from '../hooks/useFetchUser'
import { UserContextProvider } from '../context/UserContextProvider'
import { useNavigate } from 'react-router-dom'

const stripePromise = loadStripe(
  'pk_test_51N5aXjSJiG7glEVu3wISGiuqsjAg94BcgwH8d6pE2IlK5SqLbFHB6TdMO3wrJzvlMgmV08WcbyOMGDfRVhn3V28n00hAzjdECn'
)

export default function Membership() {
  const navigate = useNavigate()
  // const userId = useContext(UserContextProvider) // Replace this with actual userId
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const response = await axios.get('/auth/userstatus')
        setCurrentUserId(response.data.UserId)
        // console.log('usercontext response.data:', response.data.UserId)
      } catch (error) {
        console.error('Error fetching user status', error)
      }
    }
    // console.log('currentuserId', currentUserId)

    fetchCurrentUserId()
  }, [])
  // console.log('currentuserId', currentUserId)
  const { user } = useFetchUser(currentUserId)
  // Fetch user data using custom hook
  // console.log({ user })
  useEffect(() => {
    // console.log('currentuserId', currentUserId)
  }, [currentUserId])

  const handlePayment = async () => {
    try {
      const response = await axios.post('/stripe/create-checkout-session', {
        userId: user._id,
        userEmail: user.email,
      })

      const sessionId = response.data.sessionId

      // Redirect to Checkout
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        // Handle error here
        console.error(error)
      }
    } catch (err) {
      // Handle error here
      console.error(err)
    }
  }
  const { isLoggedIn, userRole, isCheckingLogin } = useUserStatus()
  const NotLoggedInDiv = () => (
    <>
      <p className='membership-para'>
        To upgrade to <span className='membership-span2'>Conduit+</span> you
        need an account. Join or sign in to continue
      </p>
      <button
        className='membership-btn'
        onClick={() => navigate('/auth/signup')}
      >
        JOIN CONDUIT NOW
      </button>
      <p className='membership-signin'>
        Already have a Conduit account?{' '}
        <a href='/auth/login' className='membership-signin-span'>
          Sign In
        </a>
      </p>
    </>
  )
  const LoggedInDiv = () => (
    <>
      <p className='membership-para'>
        To upgrade to <span className='membership-span2'>Conduit+</span> just
        pay 1$ per month.
      </p>
      <button className='membership-btn' onClick={handlePayment}>
        Join Conduit+
      </button>
    </>
  )
  return (
    <div>
      <div className='membership-wrapper'>
        {!isLoggedIn && !isCheckingLogin ? <Header2 /> : <Header />}
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
