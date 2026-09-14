import { z } from 'zod'

export const formSchema = z
    .object({
        // Personal info
        firstName: z.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50 characters'),
        lastName: z.string().min(2, 'Minimum 2 characters').max(50, 'Maximum 50 characters'),
        email: z.string().min(1, 'Email is required').email('Invalid email address'),
        phone: z
            .string()
            .min(1, 'Phone number is required')
            .regex(/^\+?[0-9\s-]{7,15}$/, 'Invalid phone number'),
        dateOfBirth: z
            .string()
            .min(1, 'Date of birth is required')
            .refine((val) => new Date(val) < new Date(), 'Date must be in the past'),
        gender: z.enum(['male', 'female', 'other'], 'Select a gender'),
        bio: z.string().max(500, 'Maximum 500 characters'),

        // Address
        country: z.string().min(1, 'Select a country'),
        street: z.string().min(3, 'Minimum 3 characters'),
        city: z.string().min(2, 'Minimum 2 characters'),
        state: z.string().min(2, 'Minimum 2 characters'),
        postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Format: 00-000'),

        // Account
        username: z
            .string()
            .min(3, 'Minimum 3 characters')
            .max(20, 'Maximum 20 characters')
            .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, digits and underscore'),
        password: z.string().min(8, 'Minimum 8 characters'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        role: z.enum(['user', 'admin', 'editor'], 'Select a role'),

        // Preferences
        newsletter: z.boolean(),
        notifications: z.boolean(),
        theme: z.enum(['light', 'dark', 'system'], 'Select a theme'),
        language: z.string().min(1, 'Select a language'),

        // Professional
        company: z.string(),
        jobTitle: z.string(),
        yearsOfExperience: z.coerce
            .number()
            .min(0, 'Cannot be negative')
            .max(60, 'Please check the value'),
        website: z.string(),
        skills: z.string().min(1, 'List at least one skill'),

        // Terms and extras
        acceptTerms: z.literal(true, 'You must accept the terms'),
        rating: z.coerce.number().min(1, 'Min 1').max(5, 'Max 5'),
        comments: z.string().max(1000, 'Maximum 1000 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    })
    .refine((data) => !data.website || /^https?:\/\/.+\..+/.test(data.website), {
        message: 'Invalid URL (must start with http:// or https://)',
        path: ['website'],
    })

export type FormValues = z.infer<typeof formSchema>
