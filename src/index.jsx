import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Membership from './pages/Membership'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Write from './pages/Write.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import OtherUserProfilePage from './pages/OtherUserProfilePage.jsx'
import Article from './pages/Article.jsx'
import { UserContextProvider } from './context/UserContextProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TagsProvider } from './context/TagsContext'
import Edit from './pages/Edit.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/membership',
    element: (
      <UserContextProvider>
        <Membership />
      </UserContextProvider>
    ),
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
    path: '/edit/:id',
    element: <Edit />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/articles/:id',
    element: <Article />,
  },
  {
    path: '/users/profile/:userId',
    element: <OtherUserProfilePage />,
  },
  {
    path: '*',
    element: <Navigate replace to='/' />,
  },
])

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TagsProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </TagsProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
