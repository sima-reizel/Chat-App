import { useNavigate } from 'react-router-dom'
import '../../styles/auth.css'

export default function AuthLayout({ activeTab, children }) {
    const navigate = useNavigate()

    return (
        <div className="auth-page">
            <div className="overlay" />
            <div className="auth-box">
                <img src="/logo2.png" alt="logo" className="logo-icon" />
                <h1 className="title">Collab Canvas</h1>
                <p className="subtitle">Real-time collaborative creative space</p>
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'login' ? 'active' : ''}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className={activeTab === 'register' ? 'active' : ''}
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
