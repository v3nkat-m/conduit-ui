import { useState } from 'react'
import axios from 'axios'

const useFollow = initialState => {
  const [hasFollowed, setHasFollowed] = useState(initialState)

  const followUser = async (followerId, followedId) => {
    try {
      // console.log('trying to follow a user')
      await axios.post('/users/follow', {
        followerId,
        followedId,
      })
      // console.log('successfully followed a user')
      setHasFollowed(true)
      // console.log('following', hasFollowed)
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  const unfollowUser = async (followerId, followedId) => {
    try {
      await axios.post('/users/unfollow', {
        followerId,
        followedId,
      })
      setHasFollowed(false)
      // console.log('unfollowing', hasFollowed)
    } catch (error) {
      console.error('Error unfollowing user:', error)
    }
  }

  return [hasFollowed, followUser, unfollowUser, setHasFollowed]
}

export default useFollow
