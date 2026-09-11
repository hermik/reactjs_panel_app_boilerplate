import { useState } from 'react'
import { z } from 'zod'
import { useLoginMutation, getLoginErrorMessage } from './useLoginMutation'
import { loginSchema } from './loginSchema'
import { consumeAuthNotice } from '../../api/authNotice'

type FieldErrors = {
    email?: string
    password?: string
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<FieldErrors>({})
    const [notice] = useState(consumeAuthNotice)
    const loginMutation = useLoginMutation()

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        const result = loginSchema.safeParse({ email, password })
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors
            setErrors({ email: fieldErrors.email?.[0], password: fieldErrors.password?.[0] })
            return
        }

        setErrors({})
        loginMutation.mutate(result.data)
    }

    return (
        <div>
            <h1>Login Page</h1>
            {notice && <p>{notice}</p>}
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                {loginMutation.isError && <p>{getLoginErrorMessage(loginMutation.error)}</p>}
                <button type="submit" disabled={loginMutation.isPending} onClick={handleLogin}>
                    {loginMutation.isPending ? 'Logowanie...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
