import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Membership from './pages/Membership'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Write from './pages/Write.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Article from './pages/Article.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/membership',
    element: <Membership />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  { path: '/auth/signup', element: <SignUp /> },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/auth/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/write',
    element: <Write />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/articles/:id',
    element: <Article />,
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
