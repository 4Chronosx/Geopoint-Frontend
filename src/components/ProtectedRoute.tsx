
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>
    if (!user) return <div>Please log in.</div> // swap with your Login component

    return <>{children}</>
}