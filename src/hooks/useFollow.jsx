import { useState } from 'react'
import api from '../axiosConfig'

const useFollow = initialState => {
  const [hasFollowed, setHasFollowed] = useState(initialState)

  const followUser = async (followerId, followedId) => {
    try {
      // console.log('trying to follow a user')
      await api.post('/users/follow', {
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
      await api.post('/users/unfollow', {
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
