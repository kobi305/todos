import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AutoContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { sign_up } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await sign_up(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('failed to sign up')
    }
    setLoading(false)
  }

  console.log('you in sign up component')

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'> Sign Up</h2>
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
            <Form.Group id='confirm_password'>
              <Form.Label>confirm password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
                autoComplete='on'
                required
              />
            </Form.Group>
            <Button className='w-100' type='submit' disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        already have an account ?{' '}
        <Link to='/login' onClick={() => console.log('you click login')}>
          Log In
        </Link>
      </div>
    </>
  )
}
