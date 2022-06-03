import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './firebase'
import { useRouter } from 'next/router'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

interface AuthContextData {
  user: User | null
  login(email: string, password: string): Promise<void>
  logout(): void
}

const authContextDefaultValue: AuthContextData = {
  user: null,
  login: (email, password) => {
    throw new Error('Method not implemented.')
  },
  logout: () => {
    throw new Error('Method not implemented.')
  },
}

export const authContext = createContext(authContextDefaultValue)

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUser(user)
        //redirect to dashboard
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null)
      })
      .catch((error) => {
        // An error happened.
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    })
  }, [])

  return { user, login, logout }
}
