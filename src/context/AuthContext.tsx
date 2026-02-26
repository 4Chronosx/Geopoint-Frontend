
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthService } from '../services/auth.service'

interface User {
    id: string
    email: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        AuthService.currentUser()
            .then(({ user }) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    const login = async (email: string, password: string) => {
        const { user } = await AuthService.login(email, password)
        setUser(user)
    }

    const logout = async () => {
        await AuthService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}