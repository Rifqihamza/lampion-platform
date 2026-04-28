'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log error ke monitoring service disini
        console.error('Application Error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>
                    <p className="text-muted-foreground">
                        Maaf, terjadi kesalahan pada aplikasi. Silahkan coba lagi.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 justify-center">
                    <Button onClick={reset}>
                        Coba Lagi
                    </Button>
                    <Button variant="secondary" onClick={() => window.location.href = '/'}>
                        Kembali Ke Beranda
                    </Button>
                </div>
            </div>
        </div>
    )
}