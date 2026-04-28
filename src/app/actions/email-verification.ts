'use server'

import { z } from 'zod'
import { error, handleZodError } from '@/lib/api-response'
import { sanitizeEmail } from '@/lib/sanitize'

const sendSchema = z.object({
    email: z.string().email(),
})

const verifySchema = z.object({
    token: z.string().length(64),
})

export async function sendVerificationEmailAction(email: string) {
    try {
        const cleanEmail = sanitizeEmail(email)
        const validated = sendSchema.safeParse({ email: cleanEmail })

        if (!validated.success) {
            return handleZodError(validated.error)
        }

        const response = await fetch(`${process.env.APP_URL}/api/auth/send-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: validated.data.email }),
        })

        return await response.json()

    } catch (err) {
        console.error('Send verification action error:', err)
        return error('Gagal mengirim email verifikasi')
    }
}

export async function verifyEmailAction(token: string) {
    try {
        const validated = verifySchema.safeParse({ token })

        if (!validated.success) {
            return handleZodError(validated.error)
        }

        const response = await fetch(`${process.env.APP_URL}/api/auth/verify-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: validated.data.token }),
        })

        return await response.json()

    } catch (err) {
        console.error('Verify email action error:', err)
        return error('Gagal memverifikasi email')
    }
}