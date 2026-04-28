'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Mail } from 'lucide-react'
import { sendVerificationEmailAction } from '@/app/actions/email-verification'
import { toast } from 'sonner'
import { useTransition } from 'react'

export default function EmailVerificationBanner() {
    const { data: session } = useSession()
    const [isPending, startTransition] = useTransition()

    if (!session?.user || session.user.emailVerified) {
        return null
    }

    async function handleResend() {
        if (!session?.user?.email) return

        startTransition(async () => {
            const result = await sendVerificationEmailAction(session.user.email!)
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-amber-800 text-sm">
                        <strong>Email anda belum terverifikasi.</strong>
                        Beberapa fitur mungkin tidak bisa diakses.
                    </p>
                </div>

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleResend}
                    disabled={isPending}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300"
                >
                    <Mail className="mr-2 h-4 w-4" />
                    Kirim Ulang Verifikasi
                </Button>
            </div>
        </div>
    )
}