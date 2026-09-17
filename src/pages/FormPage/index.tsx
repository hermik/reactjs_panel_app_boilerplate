import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { formSchema, type FormValues } from './formSchema'
import { NativeSelect } from './NativeSelect'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Textarea } from '@/components/ui/textarea'
import { Rating } from '@/components/ui/rating'

type FieldErrors = Partial<Record<keyof FormValues, string>>

/**
 * Large form as a "ref-based" example: zero useState per field. Values are
 * read only on submit via FormData(formRef.current), so typing into a field
 * doesn't re-render the whole form. Controls must be native (input/select/
 * textarea) — see the comment in NativeSelect.tsx for why Radix's Select/
 * RadioGroup/Checkbox components aren't used here.
 */
export default function FormPage() {
    const formRef = useRef<HTMLFormElement>(null)
    const [errors, setErrors] = useState<FieldErrors>({})
    const [submitted, setSubmitted] = useState<FormValues | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formRef.current) return

        const raw = Object.fromEntries(new FormData(formRef.current))
        const payload = {
            ...raw,
            // unchecked checkboxes don't appear in FormData at all
            newsletter: raw.newsletter === 'on',
            notifications: raw.notifications === 'on',
            acceptTerms: raw.acceptTerms === 'on',
        }

        const result = formSchema.safeParse(payload)
        if (!result.success) {
            const fieldErrors = z.flattenError(result.error).fieldErrors
            setErrors(
                Object.fromEntries(
                    Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]]),
                ) as FieldErrors,
            )
            setSubmitted(null)
            toast.error('The form has errors — please fix the highlighted fields.', { position: 'top-center' })
            return
        }

        setErrors({})
        setSubmitted(result.data)
        toast.success('Form submitted!')
    }

    const handleReset = () => {
        formRef.current?.reset()
        setErrors({})
        setSubmitted(null)
    }

    return (
        <div className="flex w-full max-w-3xl flex-col gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Form example — ref-based + zod</CardTitle>
                    <CardDescription>
                        It uses uncontrolled form fields and reads data from the DOM using FormData upon submission,
                        with validation handled by a Zod schema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} noValidate>
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend>Personal info</FieldLegend>
                                <FieldGroup>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="firstName">First name</FieldLabel>
                                            <Input id="firstName" name="firstName" aria-invalid={!!errors.firstName} />
                                            <FieldError>{errors.firstName}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                                            <Input id="lastName" name="lastName" aria-invalid={!!errors.lastName} />
                                            <FieldError>{errors.lastName}</FieldError>
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="email">Email</FieldLabel>
                                            <Input id="email" name="email" type="email" aria-invalid={!!errors.email} />
                                            <FieldError>{errors.email}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                            <Input id="phone" name="phone" type="tel" aria-invalid={!!errors.phone} />
                                            <FieldError>{errors.phone}</FieldError>
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel>
                                        <Input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            aria-invalid={!!errors.dateOfBirth}
                                        />
                                        <FieldError>{errors.dateOfBirth}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Gender</FieldLabel>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    className="accent-primary"
                                                />
                                                Male
                                            </label>
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    className="accent-primary"
                                                />
                                                Female
                                            </label>
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="other"
                                                    className="accent-primary"
                                                />
                                                Other
                                            </label>
                                        </div>
                                        <FieldError>{errors.gender}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                        <Textarea id="bio" name="bio" rows={3} aria-invalid={!!errors.bio} />
                                        <FieldDescription>Maximum 500 characters.</FieldDescription>
                                        <FieldError>{errors.bio}</FieldError>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Address</FieldLegend>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="country">Country</FieldLabel>
                                        <NativeSelect
                                            id="country"
                                            name="country"
                                            defaultValue=""
                                            aria-invalid={!!errors.country}
                                        >
                                            <option value="">Select a country</option>
                                            <option value="pl">Poland</option>
                                            <option value="de">Germany</option>
                                            <option value="fr">France</option>
                                            <option value="gb">United Kingdom</option>
                                            <option value="us">USA</option>
                                        </NativeSelect>
                                        <FieldError>{errors.country}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="street">Street and number</FieldLabel>
                                        <Input id="street" name="street" aria-invalid={!!errors.street} />
                                        <FieldError>{errors.street}</FieldError>
                                    </Field>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <Field>
                                            <FieldLabel htmlFor="city">City</FieldLabel>
                                            <Input id="city" name="city" aria-invalid={!!errors.city} />
                                            <FieldError>{errors.city}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="state">State / Province</FieldLabel>
                                            <Input id="state" name="state" aria-invalid={!!errors.state} />
                                            <FieldError>{errors.state}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="postalCode">Postal code</FieldLabel>
                                            <Input
                                                id="postalCode"
                                                name="postalCode"
                                                placeholder="00-000"
                                                aria-invalid={!!errors.postalCode}
                                            />
                                            <FieldError>{errors.postalCode}</FieldError>
                                        </Field>
                                    </div>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Account</FieldLegend>
                                <FieldGroup>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="username">Username</FieldLabel>
                                            <Input id="username" name="username" aria-invalid={!!errors.username} />
                                            <FieldError>{errors.username}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="role">Role</FieldLabel>
                                            <NativeSelect
                                                id="role"
                                                name="role"
                                                defaultValue="user"
                                                aria-invalid={!!errors.role}
                                            >
                                                <option value="user">User</option>
                                                <option value="editor">Editor</option>
                                                <option value="admin">Administrator</option>
                                            </NativeSelect>
                                            <FieldError>{errors.role}</FieldError>
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                aria-invalid={!!errors.password}
                                            />
                                            <FieldError>{errors.password}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                                            <PasswordInput
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                aria-invalid={!!errors.confirmPassword}
                                            />
                                            <FieldError>{errors.confirmPassword}</FieldError>
                                        </Field>
                                    </div>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Preferences</FieldLegend>
                                <FieldGroup>
                                    <Field orientation="horizontal">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            name="newsletter"
                                            className="size-4 accent-primary"
                                        />
                                        <FieldLabel htmlFor="newsletter" className="font-normal">
                                            Subscribe me to the newsletter
                                        </FieldLabel>
                                    </Field>
                                    <Field orientation="horizontal">
                                        <input
                                            type="checkbox"
                                            id="notifications"
                                            name="notifications"
                                            className="size-4 accent-primary"
                                        />
                                        <FieldLabel htmlFor="notifications" className="font-normal">
                                            Email notifications
                                        </FieldLabel>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Theme</FieldLabel>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="theme"
                                                    value="light"
                                                    className="accent-primary"
                                                />
                                                Light
                                            </label>
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="theme"
                                                    value="dark"
                                                    className="accent-primary"
                                                />
                                                Dark
                                            </label>
                                            <label className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="radio"
                                                    name="theme"
                                                    value="system"
                                                    className="accent-primary"
                                                />
                                                System
                                            </label>
                                        </div>
                                        <FieldError>{errors.theme}</FieldError>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="language">Language</FieldLabel>
                                        <NativeSelect
                                            id="language"
                                            name="language"
                                            defaultValue=""
                                            aria-invalid={!!errors.language}
                                        >
                                            <option value="">Select a language</option>
                                            <option value="pl">Polish</option>
                                            <option value="en">English</option>
                                            <option value="de">Deutsch</option>
                                            <option value="fr">Français</option>
                                        </NativeSelect>
                                        <FieldError>{errors.language}</FieldError>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Professional</FieldLegend>
                                <FieldGroup>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="company">Company</FieldLabel>
                                            <Input id="company" name="company" aria-invalid={!!errors.company} />
                                            <FieldError>{errors.company}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="jobTitle">Job title</FieldLabel>
                                            <Input id="jobTitle" name="jobTitle" aria-invalid={!!errors.jobTitle} />
                                            <FieldError>{errors.jobTitle}</FieldError>
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="yearsOfExperience">Years of experience</FieldLabel>
                                            <Input
                                                id="yearsOfExperience"
                                                name="yearsOfExperience"
                                                type="number"
                                                min={0}
                                                max={60}
                                                aria-invalid={!!errors.yearsOfExperience}
                                            />
                                            <FieldError>{errors.yearsOfExperience}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="website">Website</FieldLabel>
                                            <Input
                                                id="website"
                                                name="website"
                                                type="url"
                                                placeholder="https://..."
                                                aria-invalid={!!errors.website}
                                            />
                                            <FieldError>{errors.website}</FieldError>
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="skills">Skills</FieldLabel>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            placeholder="React, TypeScript, ..."
                                            aria-invalid={!!errors.skills}
                                        />
                                        <FieldDescription>Comma-separated.</FieldDescription>
                                        <FieldError>{errors.skills}</FieldError>
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <FieldSeparator />

                            <FieldSet>
                                <FieldLegend>Additional</FieldLegend>
                                <FieldGroup>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field>
                                            <FieldLabel htmlFor="rating">Rating (1-5)</FieldLabel>

                                            <Rating id="rating" name="rating" aria-invalid={!!errors.rating} />
                                            <FieldError>{errors.rating}</FieldError>
                                        </Field>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="comments">Comments</FieldLabel>
                                        <Textarea
                                            id="comments"
                                            name="comments"
                                            rows={3}
                                            aria-invalid={!!errors.comments}
                                        />
                                        <FieldError>{errors.comments}</FieldError>
                                    </Field>
                                    <Field orientation="horizontal">
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            className="size-4 accent-primary"
                                        />
                                        <FieldLabel htmlFor="acceptTerms" className="font-normal">
                                            I accept the terms
                                        </FieldLabel>
                                    </Field>
                                    <FieldError>{errors.acceptTerms}</FieldError>
                                </FieldGroup>
                            </FieldSet>

                            <Field orientation="horizontal">
                                <Button type="submit">Submit</Button>
                                <Button type="button" variant="outline" onClick={handleReset}>
                                    Reset
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            {submitted && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Validated data</CardTitle>
                        <CardDescription>
                            This is what came out of formSchema.safeParse on the ref-based read side.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                            {JSON.stringify(submitted, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
