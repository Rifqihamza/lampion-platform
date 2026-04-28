// src/app/(auth)/verify-email/page.tsx
import { Suspense } from 'react'
import VerifyEmailContent from './_components/VerifyEmailContent'
import { Loader2 } from 'lucide-react'

export default function VerifyEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                </div>
            }
        >
            <VerifyEmailContent />
        </Suspense>
    )
}