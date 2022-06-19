import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { AutoProvider } from '../context/AutoContext'
import SignUp from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'

function App () {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AutoProvider>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AutoProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
