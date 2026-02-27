

export async function apiClient(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        ...options,
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    if (res.status === 401) {
        if (window.location.pathname !== '/login') {
            window.location.href = '/login'
        }
        return {}
    }

    if (!res.ok) {
        try {
            const error = await res.json()
            throw new Error(error.message || error.error || 'API error')
        } catch (e) {
            if (e instanceof Error && e.message !== 'API error') throw e
            throw new Error(`Request failed (${res.status})`)
        }
    }

    // 204 No Content — don't parse body
    if (res.status === 204) return {}

    return res.json()
}