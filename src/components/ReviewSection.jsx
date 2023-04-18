import React from 'react'
import Review from './Review'
import bond from '../assets/bond.jpg'
import sherlock from '../assets/sherlock.jpg'
import rose from '../assets/rose.jpg'
import katniss from '../assets/katniss.jpg'
import tom from '../assets/tom.jpg'
import wick from '../assets/wick.jpg'

import '../css/Review.css'

export default function ReviewSection() {
  return (
    <div className='review-section-container'>
      <Review
        name='James Bond'
        date='Joined July 07 2007'
        content="I have been using conduit for years now. I use it to share some of my experiences. You'd be surprised how many people now know me just because of my blog rather than my other work"
        profilePic={bond}
      />
      <Review
        name='Sherlock Holmes'
        date='Joined September 03 2020'
        content='Knowing that I can write about my life and experiences, and connect with other people that have had the same experiences and thoughts, are what I’ve always really enjoyed about creating.'
        profilePic={sherlock}
      />
      <Review
        name='John Wick'
        date='Joined May 07 2021'
        content="You'd be surprised how many views your other stories will gather if your breakout story is written well. It encourages a certain ripple effect that really boosts your overall views."
        profilePic={wick}
      />
      <Review
        name='Katniss Everdeen'
        date='Joined June 21 2020'
        content='Conduit is full of opportunities, inspiration, and the ability to connect with people who understand your passion in a way many cannot.'
        profilePic={katniss}
      />
      <Review
        name='Rose Dewitt Bukater'
        date='Joined July 07 2021'
        content='The support that I am given on Conduit is tremendous. I have received tips from other users, numerous likes on my stories, and bonuses from Conduit itself.'
        profilePic={rose}
      />
      <Review
        name='Ethan Hunt'
        date='Joined September 22 2018'
        content='Some of the challenges they conduct in Conduit are really interesting than some of the missions I have ever taken part in real life. The community really appreciates everyone for their work and also helps to improve oneself by giving constructive criticism'
        profilePic={tom}
      />
    </div>
  )
}
