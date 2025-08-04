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
        if (!userName.trim()) newErrors.userName = 'Please enter a user name'
        if (!password.trim()) newErrors.password = 'Please enter a password'
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
                <label>User Name</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your user name"
                />
                {errors.userName && <small style={{ color: 'red' }}>{errors.userName}</small>}

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

                <button type="submit">Login <span className="arrow">↦</span></button>
            </form>
        </AuthLayout>
    )
}