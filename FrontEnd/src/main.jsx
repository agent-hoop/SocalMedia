import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Routs from './Routs'

import {  RouterProvider } from 'react-router-dom'
import { ProfileContextProvider } from './Context/ProfileContext.jsx'
import { PostProvider } from './Context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostProvider>

    <ProfileContextProvider>
      <RouterProvider router={Routs}/>

    </ProfileContextProvider>
    </PostProvider>
  </StrictMode>,
)
