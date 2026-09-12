import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useState } from 'react'
import { z } from 'zod'
import { signupSchema } from './signupSchema'
import { NavLink } from 'react-router-dom'
import { useRegisterMutation } from './useRegisterMutation'
type FieldErrors = {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export default function SignupPage() {
    const [errors, setErrors] = useState<FieldErrors>({})
    const registerMutation = useRegisterMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget))
        const result = signupSchema.safeParse(data)
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                confirmPassword: fieldErrors.confirmPassword?.[0],
            })
            return
        }

        setErrors({})
        registerMutation.mutate(result.data)
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>Enter your information below to create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        aria-invalid={!!errors.name}
                                    />
                                    <FieldError>{errors.name}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        aria-invalid={!!errors.email}
                                    />
                                    <FieldDescription>
                                        We&apos;ll use this to contact you. We will not share your email with anyone
                                        else.
                                    </FieldDescription>
                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <PasswordInput id="password" name="password" aria-invalid={!!errors.password} />
                                    <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                                    <FieldError>{errors.password}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                                    <PasswordInput
                                        id="confirm-password"
                                        name="confirmPassword"
                                        aria-invalid={!!errors.confirmPassword}
                                    />
                                    <FieldDescription>Please confirm your password.</FieldDescription>
                                    <FieldError>{errors.confirmPassword}</FieldError>
                                </Field>
                                <FieldGroup>
                                    <Field>
                                        <Button type="submit">Create Account</Button>
                                        {/* <Button variant="outline" type="button">
                                            Sign up with Google
                                        </Button> */}
                                        <FieldDescription className="px-6 text-center">
                                            Already have an account? <NavLink to="/login">Sign in</NavLink>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
