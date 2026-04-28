'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { success, error, handleZodError } from '@/lib/api-response'
import { sendVerificationEmailAction } from './email-verification'

const passwordSchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8).max(128),
})

const emailSchema = z.object({
    email: z.string().email(),
})

export async function changePasswordAction(data: z.infer<typeof passwordSchema>) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return error('Unauthorized', 'UNAUTHORIZED')
        }

        const validated = passwordSchema.safeParse(data)
        if (!validated.success) {
            return handleZodError(validated.error)
        }

        const { currentPassword, newPassword } = validated.data

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { password: true },
        })

        if (!user || !user.password) {
            return error('User tidak ditemukan', 'USER_NOT_FOUND')
        }

        const isValid = await bcrypt.compare(currentPassword, user.password)
        if (!isValid) {
            return error('Password saat ini salah', 'INVALID_PASSWORD')
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        })

        return success(null, 'Password berhasil diubah')

    } catch (err) {
        console.error('Change password error:', err)
        return error('Gagal mengubah password')
    }
}

export async function changeEmailAction(newEmail: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return error('Unauthorized', 'UNAUTHORIZED')
        }

        const validated = emailSchema.safeParse({ email: newEmail })
        if (!validated.success) {
            return handleZodError(validated.error)
        }

        // Cek apakah email sudah dipakai
        const existing = await prisma.user.findUnique({
            where: { email: validated.data.email },
        })

        if (existing && existing.id !== session.user.id) {
            return error('Email sudah terdaftar', 'EMAIL_EXISTS')
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                email: validated.data.email,
                emailVerified: null,
            },
        })

        // Kirim verifikasi ke email baru
        await sendVerificationEmailAction(validated.data.email)

        return success(null, 'Email berhasil diubah. Silahkan verifikasi email baru anda.')

    } catch (err) {
        console.error('Change email error:', err)
        return error('Gagal mengubah email')
    }
}

export async function resendVerificationAction() {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return error('Unauthorized', 'UNAUTHORIZED')
        }

        return await sendVerificationEmailAction(session.user.email)

    } catch (err) {
        console.error('Resend verification error:', err)
        return error('Gagal mengirim verifikasi email')
    }
}

export async function deleteAccountAction() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return error('Unauthorized', 'UNAUTHORIZED')
        }

        // Hapus semua data user
        await prisma.userProgress.deleteMany({ where: { userId: session.user.id } })
        await prisma.aIChatHistory.deleteMany({ where: { userId: session.user.id } })
        await prisma.user.delete({ where: { id: session.user.id } })

        return success(null, 'Akun berhasil dihapus')

    } catch (err) {
        console.error('Delete account error:', err)
        return error('Gagal menghapus akun')
    }
}