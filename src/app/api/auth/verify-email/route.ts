import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { checkRateLimit, getIpFromRequest } from '@/lib/rate-limiter'
import { success, error, handleZodError, jsonResponse } from '@/lib/api-response'

const schema = z.object({
    token: z.string().length(64),
})

export async function POST(request: Request) {
    try {
        const ip = getIpFromRequest(request)
        const rateLimit = await checkRateLimit(`verify-email:${ip}`)

        if (!rateLimit.success) {
            return jsonResponse(error('Terlalu banyak permintaan', 'RATE_LIMIT'), 429)
        }

        const body = await request.json()
        const validated = schema.safeParse(body)

        if (!validated.success) {
            return jsonResponse(handleZodError(validated.error), 400)
        }

        const { token } = validated.data

        // Cari token
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        })

        if (!verificationToken) {
            return jsonResponse(error('Token tidak valid', 'INVALID_TOKEN'), 400)
        }

        // Cek kadaluarsa
        if (verificationToken.expires < new Date()) {
            await prisma.verificationToken.delete({ where: { token } })
            return jsonResponse(error('Token sudah kadaluarsa', 'TOKEN_EXPIRED'), 400)
        }

        // Update user emailVerified
        await prisma.user.update({
            where: { email: verificationToken.email },
            data: { emailVerified: new Date() },
        })

        // Hapus token setelah dipakai
        await prisma.verificationToken.delete({ where: { token } })

        return jsonResponse(success(null, 'Email berhasil diverifikasi! Silahkan login.'))

    } catch (err) {
        console.error('Verify email error:', err)
        return jsonResponse(error('Gagal memverifikasi email'), 500)
    }
}