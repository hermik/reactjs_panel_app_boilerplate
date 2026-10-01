import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'
import { useLoginMutation, getLoginErrorMessage, isServerError } from './useLoginMutation'
import { loginSchema } from './loginSchema'
import { consumeAuthNotice } from '../../api/authNotice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
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
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            })
            return
        }

        setErrors({})
        loginMutation.mutate(result.data)
    }

    return (
        <section className="relative overflow-hidden">
            <div className="absolute -top-100 -left-50 rounded-full size-280 bg-pink-600/5 blur-[200px]"></div>
            <div className="absolute -right-40 -bottom-110 rounded-full size-250 bg-red-300/20 blur-[160px]"></div>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative z-10">
                <div className="w-full max-w-sm">
                    <h1 className="text-bold text-large text-center">
                        Hello,{' '}
                        <span className="bg-linear-to-tr from-pink-900 to-red-300 bg-clip-text text-transparent">
                            world!
                        </span>
                    </h1>
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login to your account</CardTitle>
                                <CardDescription>Enter your email below to login to your account</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {notice && <p>{notice}</p>}
                                <form className="login-form">
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="m@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                                        </Field>

                                        <Field>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                                {/* <a href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                                            </div>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                aria-invalid={!!errors.password}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                                        </Field>
                                        <Field>
                                            <Button
                                                type="submit"
                                                onClick={handleLogin}
                                                className={loginMutation.isPending ? 'bg-stripes-animated' : ''}
                                            >
                                                {/* {loginMutation.isPending ? <Spinner className="size-4 mr-2" /> : ''}{' '} */}
                                                Login
                                            </Button>
                                            {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                                            <FieldDescription className="text-center">
                                                Don't have an account? <NavLink to="/signup">Sign up</NavLink>
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>

                                    {loginMutation.isError && !isServerError(loginMutation.error) && (
                                        <p>{getLoginErrorMessage(loginMutation.error)}</p>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
