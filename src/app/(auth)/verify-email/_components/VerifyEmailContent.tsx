'use client'

import { useEffect, useState, useTransition } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
// ... import lainnya sama seperti kode kamu
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle2, XCircle, Mail } from 'lucide-react'
import { verifyEmailAction, sendVerificationEmailAction } from '@/app/actions/email-verification'
import { toast } from 'sonner'

export default function VerifyEmailContent() {
    const searchParams = useSearchParams() // Ini yang memicu error build jika tidak di-suspense
    const router = useRouter()
    const token = searchParams.get('token')

    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired' | 'idle'>('idle')
    const [isPending, startTransition] = useTransition()
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (token) {
            const verifyToken = async (token: string) => {
                setStatus('loading')

                const result = await verifyEmailAction(token)

                if (result.success) {
                    setStatus('success')
                    toast.success(result.message)
                    setTimeout(() => router.push('/login'), 3000)
                } else {
                    if (result.code === 'TOKEN_EXPIRED') {
                        setStatus('expired')
                    } else {
                        setStatus('error')
                    }
                    toast.error(result.error)
                }
            }

            verifyToken(token)
        }
    }, [token, router])

    async function handleResend() {
        if (!email) return

        startTransition(async () => {
            const result = await sendVerificationEmailAction(email)

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        })
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
                    <h2 className="text-xl font-semibold">Memverifikasi Email...</h2>
                    <p className="text-muted-foreground">Mohon tunggu sebentar</p>
                </div>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
                    <h2 className="text-2xl font-bold">Email Berhasil Diverifikasi!</h2>
                    <p className="text-muted-foreground">
                        Selamat! Email anda sudah terverifikasi. Anda akan dialihkan ke halaman login dalam 3 detik.
                    </p>
                    <Button onClick={() => router.push('/login')}>
                        Ke Halaman Login
                    </Button>
                </div>
            </div>
        )
    }

    if (status === 'error' || status === 'expired') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <XCircle className="h-16 w-16 mx-auto text-red-500" />
                    <h2 className="text-2xl font-bold">
                        {status === 'expired' ? 'Token Kadaluarsa' : 'Verifikasi Gagal'}
                    </h2>
                    <p className="text-muted-foreground">
                        {status === 'expired'
                            ? 'Link verifikasi sudah kadaluarsa. Silahkan minta link verifikasi baru.'
                            : 'Token verifikasi tidak valid. Silahkan coba lagi.'}
                    </p>

                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Masukkan email anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <Button
                            onClick={handleResend}
                            disabled={isPending || !email}
                            className="w-full"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Mail className="mr-2 h-4 w-4" />
                            Kirim Ulang Link Verifikasi
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <Mail className="h-16 w-16 mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Verifikasi Email</h2>
                <p className="text-muted-foreground">
                    Silahkan klik link verifikasi yang kami kirim ke email anda.
                </p>
            </div>
        </div>
    )
}