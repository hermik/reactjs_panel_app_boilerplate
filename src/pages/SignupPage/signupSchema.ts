import { z } from 'zod'

export const signupSchema = z
    .object({
        name: z.string().min(1, 'Imię jest wymagane'),
        email: z.string().min(1, 'Email jest wymagany').email('Nieprawidłowy adres email'),
        password: z.string().min(1, 'Hasło jest wymagane'),
        confirmPassword: z.string().min(1, 'Potwierdzenie hasła jest wymagane'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Hasła muszą być takie same',
        path: ['confirmPassword'],
    })

export type SignupFormValues = z.infer<typeof signupSchema>
