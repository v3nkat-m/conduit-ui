import React from 'react'
import Landing from './pages/Landing'
import './css/App.css'
import { UserContextProvider } from './context/UserContextProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { TagsProvider } from './context/TagsContext'
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TagsProvider>
        <UserContextProvider>
          <div>
            <Landing />
          </div>
        </UserContextProvider>
      </TagsProvider>
    </QueryClientProvider>
  )
}
