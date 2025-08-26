import React from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CustomerBooking from './pages/CustomerBooking.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const router = createBrowserRouter([
  { path: '/:companyId', element: <CustomerBooking /> },
  { path: '/:companyId/admin', element: <AdminDashboard /> }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
