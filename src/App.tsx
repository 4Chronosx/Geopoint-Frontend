import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { Toaster } from './components/ui/sonner'


function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" replace />
    return <>{children}</>
}

function GuestRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    if (user) return <Navigate to="/home" replace />
    return <>{children}</>
}

// src/App.tsx
export default function App() {
    const { loading } = useAuth()

    if (loading) return (
        <div className="space-bg min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                <span className="text-sm text-slate-400">Loading…</span>
            </div>
        </div>
    )

    return (
        <BrowserRouter>
            <Toaster position="bottom-right" richColors closeButton />
            <Routes>
                <Route path="/login" element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                } />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}