import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

// create the context
const AutoContext = React.createContext()

// create the hook in order to use the context values : user ..
export function useAuth () {
  return useContext(AutoContext)
}

export function AutoProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function sign_up (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    sign_up,
    login
  }

  return (
    <AutoContext.Provider value={value}>
      {!loading && children}
    </AutoContext.Provider>
  )
}
