import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/authApi'
import AuthLayout from './authLayout'


export default function LoginForm() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        if (!userName.trim()) newErrors.userName = 'הכנס שם משתמש'
        if (!password.trim()) newErrors.password = 'הכנס סיסמא'
        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) return

        try {
            const data = await login({ userName, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/chatMenu')
        } catch (err) {
            alert(err?.response?.data?.message || 'Login failed')
        }
    }
    return (
        <AuthLayout activeTab="login">
            <form onSubmit={handleSubmit}>
                <label>שם משתמש</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="הכנס שם משתמש"
                />
                {errors.userName && <small style={{ color: 'red' }}>{errors.userName}</small>}

                <label>סיסמא</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="הכנס סיסמא"
                />
                {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

                <button type="submit">התחבר<span className="arrow">↦</span></button>
            </form>
        </AuthLayout>
    )
}