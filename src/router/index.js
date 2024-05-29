// route configuration

import Layout from '@/pages/layout' // = src/pages
import Login from '@/pages/login'

import { createBrowserRouter } from 'react-router-dom'

// Configure Router Instance

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />
  },
  {
    path: "/login",
    element: <Login />
  },
])

export default router