import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  authOpen: boolean
  setAuthOpen: (open: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("matemai_user")
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (u: User) => {
    setUser(u)
    localStorage.setItem("matemai_user", JSON.stringify(u))
    setAuthOpen(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("matemai_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authOpen, setAuthOpen }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
