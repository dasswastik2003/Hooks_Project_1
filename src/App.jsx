import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/auth/login/login'
import Register from './pages/auth/register/register'
// import Otp from './pages/auth/otp/otp'
import OtpPage from './pages/auth/otp/otp'

function App() {
  const publicRoute = [
    {
      path: `/`,
      component: <Login/>
    },
    {
      path: `/auth/register`,
      component:<Register/>
    },
    {
      path: `/auth/otp`,
      component:<OtpPage/>
    }
  ]
  const privateRoute = [
    {

    }
  ]
  return (
    <>
      <Router>
        <Routes>
          {publicRoute.map((item) => {
            return <Route path={item.path} element={item.component}/>
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
