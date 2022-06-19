import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AutoContext'
import { Link, useNavigate, useHistory } from 'react-router-dom'

export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (e) {
      console.log(e)
      setError('failed to log in')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                autoComplete='on'
                required
              />
            </Form.Group>
            <Button className='w-100' type='submit' disabled={loading}>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        need an account ?{' '}
        <Link to='/signup' onClick={() => console.log('you click sign up')}>
          sign up
        </Link>
      </div>
    </>
  )
}
