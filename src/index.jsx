import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Membership from './pages/Membership'
import ErrorPage from './pages/ErrorPage'
import SignUp from './pages/SignUp.jsx'
const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/membership',
    element: <Membership />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {path:'/signup',
  element:<SignUp />

  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
