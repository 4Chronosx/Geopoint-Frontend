import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Globe, MapPin } from "lucide-react"

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        try {
            await login(email, password)
            navigate('/home', { replace: true })
        } catch {
            toast.error('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin()
    }

    return (
        <div className="space-bg min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
            {/* Atmospheric glow orbs */}
            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-100 h-100 rounded-full bg-blue-700/10 blur-[80px] pointer-events-none" />

            {/* Logo / Brand */}
            <div className="relative z-10 flex flex-col items-center mb-10 gap-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 glow-cyan">
                        <Globe className="h-6 w-6 text-cyan-400" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">GeoPoint</span>
                </div>
                <p className="text-slate-400 text-sm tracking-widest uppercase">IP Geolocation Platform</p>
            </div>

            {/* Glass card */}
            <div className="glass-card relative z-10 w-full max-w-sm rounded-2xl p-8 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold text-white">Sign in</h1>
                    <p className="text-sm text-slate-400">Access your geolocation dashboard</p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400 uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}
                            placeholder="user@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-400 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2.5 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    className="btn-cyan w-full py-2.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    <MapPin className="h-4 w-4" />
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </div>

            {/* Footer dots */}
            <div className="relative z-10 mt-8 flex gap-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                ))}
            </div>
        </div>
    )
}