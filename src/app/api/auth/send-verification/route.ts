import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendEmail, verificationEmailTemplate } from '@/lib/email'
import { env } from '@/lib/env'
import { z } from 'zod'
import { checkRateLimit, getIpFromRequest } from '@/lib/rate-limiter'
import { success, error, handleZodError, jsonResponse } from '@/lib/api-response'

const schema = z.object({
    email: z.string().email(),
})

export async function POST(request: Request) {
    try {
        // Rate Limiter
        const ip = getIpFromRequest(request)
        const rateLimit = await checkRateLimit(`send-verification:${ip}`)

        if (!rateLimit.success) {
            return jsonResponse(error('Terlalu banyak permintaan, coba lagi nanti', 'RATE_LIMIT'), 429)
        }

        const body = await request.json()
        const validated = schema.safeParse(body)

        if (!validated.success) {
            return jsonResponse(handleZodError(validated.error), 400)
        }

        const { email } = validated.data

        // Cari user
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return jsonResponse(success(null, 'Jika email terdaftar, link verifikasi akan dikirim'))
        }

        // Jika user sudah terverifikasi
        if (user.emailVerified) {
            return jsonResponse(success(null, 'Email sudah terverifikasi'))
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 jam

        // Hapus token lama
        await prisma.verificationToken.deleteMany({ where: { email } })

        // Buat token baru
        await prisma.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        })

        // Kirim email
        const verificationUrl = `${env.APP_URL}/verify-email?token=${token}`
        await sendEmail({
            to: email,
            subject: 'Verifikasi Email Anda - Lampion Platform',
            html: verificationEmailTemplate(user.name || '', verificationUrl),
        })

        return jsonResponse(success(null, 'Link verifikasi sudah dikirim ke email anda'))

    } catch (err) {
        console.error('Send verification error:', err)
        return jsonResponse(error('Gagal mengirim verifikasi email'), 500)
    }
}