import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserProfilePage() {
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(false)
  const [data, setData] = useState({
    picture: '',
    bio: '',
  })

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/users/profile')
      setUser(response.data)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      const response = await axios.put('/users/profile', data)
      setUser(response.data)
      setEdit(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setData(prevData => ({
        ...prevData,
        picture: reader.result,
      }))
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}</h1>
          {!edit ? (
            <div>
              <img src={user.picture} alt='ProfilePic' />
              <p>{user.bio}</p>
              <button onClick={() => setEdit(true)}>Edit Profile</button>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <input
                type='text'
                value={data.picture}
                onChange={e =>
                  setData({
                    ...data,
                    picture: e.target.value,
                  })
                }
              />
              <input type='file' onChange={handleImageChange} />
              <textarea
                value={data.bio}
                onChange={e =>
                  setData({
                    ...data,
                    bio: e.target.value,
                  })
                }
              />
              <button type='submit'>Save</button>
              <button onClick={() => setEdit(false)}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading.......</p>
      )}
    </div>
  )
}
