import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ErrorPage from './components/ErrorPage'
import './index.css'
import Login from './components/Login'
import Register from './components/Register'
import AuthProviders from './components/provider/AuthProviders'
import PrivateRoute from './components/routes/PrivateRoute'
import UpdateAtoy from './components/UpdateClass'
import Instructors from './components/Instructors'
import Classes from './components/Classes'
import AddClass from './components/AddClass'
import DashBoard from './components/DashBoard'
import ManageClasses from './ManageClasses'
import ManageUsers from './components/ManageUsers'
import Payment from './components/Payment'
import PaymentContext from './PaymentContext'
import UpdateClass from './components/UpdateClass'
import Feedback from './components/Feedback'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage />,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/users')
  },

  {
    path: 'register',
    element: <Register />

  },
  {
    path: 'classes',
    element: <Classes/>,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/users')
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'manageClasses',
    element: <PrivateRoute><ManageClasses/></PrivateRoute>,
  },
  {
    path: 'payment/:fees',
    element: <Payment/>,
  },
  {
    path: 'manageUsers',
    element: <PrivateRoute><ManageUsers/></PrivateRoute>,
  },
  {
    path: 'dashboard',
    element: <DashBoard/>,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/classes')
  },
  {
    path: 'addclass',
    element: <AddClass/>
  },
  {
    path: 'instructors',
    element: <Instructors></Instructors>,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/users')
  },
  {
    path: 'updateclass/:id',
    element: <UpdateClass/>,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/classes')
  },
  {
    path: 'feedback/:id',
    element: <Feedback/>,
    loader: () => fetch('https://assignment-twelve-server-pi.vercel.app/classes')
  }
  

])

ReactDOM.createRoot(document.getElementById('root')).render(
 <PaymentContext.Provider value={{ fees: null }}> <AuthProviders>
    <RouterProvider router={router} />
  </AuthProviders></PaymentContext.Provider>

);
