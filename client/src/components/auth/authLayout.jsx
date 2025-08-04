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
                <p className="subtitle">מרחב יצירה שיתופי בזמן אמת</p>
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'login' ? 'active' : ''}
                        onClick={() => navigate('/login')}
                    >
                        התחברות
                    </button>
                    <button
                        className={activeTab === 'register' ? 'active' : ''}
                        onClick={() => navigate('/register')}
                    >
                        הרשמה 
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
