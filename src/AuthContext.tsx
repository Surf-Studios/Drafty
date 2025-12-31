/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './firebase'

export interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for demo mode in localStorage
    const demoMode = localStorage.getItem('drafty-demo-mode')
    if (demoMode === 'true') {
      const mockUser = {
        uid: 'demo-user',
        email: 'demo@example.com',
      } as User
      setUser(mockUser)
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async (email: string, password: string) => {
    // Check for demo mode
    if (email === 'demo@example.com' && password === 'demo123') {
      localStorage.setItem('drafty-demo-mode', 'true')
      const mockUser = {
        uid: 'demo-user',
        email: 'demo@example.com',
      } as User
      setUser(mockUser)
      return
    }
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email: string, password: string) => {
    // Check for demo mode
    if (email === 'demo@example.com' && password === 'demo123') {
      localStorage.setItem('drafty-demo-mode', 'true')
      const mockUser = {
        uid: 'demo-user',
        email: 'demo@example.com',
      } as User
      setUser(mockUser)
      return
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    localStorage.removeItem('drafty-demo-mode')
    await signOut(auth)
  }

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
