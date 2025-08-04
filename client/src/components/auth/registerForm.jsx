import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../api/authApi'
import AuthLayout from './authLayout'

export default function RegisterForm() {
    const [user, setUser] = useState({ userName: '', password: '', email: '' })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        if (!user.userName) newErrors.userName = 'User Name is required'
        if (!validatePassword(user.password)) newErrors.password = 'Password must be at least 6 characters and include letters and numbers'
        if (!validateEmail(user.email)) newErrors.email = 'Invalid email address'
        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) return

        try {
            const data = await register(user)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/chatMenu')
        } catch (err) {
            alert(err?.response?.data?.message || err)
        }
    }
   return (
        <AuthLayout activeTab="register">
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                    placeholder="Enter your user name"
                />
                {errors.userName && <small style={{ color: 'red' }}>{errors.userName}</small>}

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Choose a password"
                />
                {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

                <button type="submit">Sign Up <span className="arrow">✱</span></button>
            </form>
        </AuthLayout>
    )
}