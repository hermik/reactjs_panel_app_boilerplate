import { useUserStore } from '../stores/userStore'
import { useState } from 'react'
export default function LoginPage() {
    const login = useUserStore((state) => state.login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!email.trim() || !password.trim()) {
            return;
        }
        
        login()
        // Add your login logic here
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}