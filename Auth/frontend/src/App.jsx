import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInpage'
import SignUpPage from './pages/SignUpPage'
import Home from './pages/Home'
import ProtectedRoute from '../src/ProtectedRoute'

function App() {
  

  return (
   <div>
    {/* <h1 className='text-3xl font-bold underline'>
      AuthApp
    </h1> */}
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </Router>
   </div>
  )
}

export default App
