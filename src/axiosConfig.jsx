import axios from 'axios'

const api = axios.create({
  baseURL: 'https://conduit-backend-2.onrender.com',
})

export default api
