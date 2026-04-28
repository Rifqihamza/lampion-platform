'use client'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Mail, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { changePasswordAction, changeEmailAction, resendVerificationAction, deleteAccountAction } from '@/app/actions/settings'

export default function SettingsPage() {
    const { data: session, update } = useSession()

    const [isPasswordPending, startPasswordTransition] = useTransition()
    const [isEmailPending, startEmailTransition] = useTransition()
    const [isResendPending, startResendTransition] = useTransition()
    const [isDeletePending, startDeleteTransition] = useTransition()

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [newEmail, setNewEmail] = useState('')

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault()

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Password baru tidak cocok')
            return
        }

        startPasswordTransition(async () => {
            const result = await changePasswordAction({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            })

            if (result.success) {
                toast.success(result.message)
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
            } else {
                toast.error(result.error)
            }
        })
    }

    async function handleChangeEmail(e: React.FormEvent) {
        e.preventDefault()

        startEmailTransition(async () => {
            const result = await changeEmailAction(newEmail)

            if (result.success) {
                toast.success(result.message)
                setNewEmail('')
                await update()
            } else {
                toast.error(result.error)
            }
        })
    }

    async function handleResendVerification() {
        startResendTransition(async () => {
            const result = await resendVerificationAction()
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.error)
            }
        })
    }

    async function handleDeleteAccount() {
        if (!confirm('Anda yakin ingin menghapus akun? Semua data akan hilang permanen.')) {
            return
        }

        startDeleteTransition(async () => {
            const result = await deleteAccountAction()
            if (result.success) {
                toast.success(result.message)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Pengaturan Akun</h1>
                <p className="text-muted-foreground">
                    Kelola keamanan dan data akun anda
                </p>
            </div>

            {/* Email Status */}
            <Alert variant={session?.user?.emailVerified ? 'default' : 'destructive'}>
                {session?.user?.emailVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                )}
                <AlertDescription className="flex items-center justify-between">
                    <span>
                        {session?.user?.emailVerified
                            ? 'Email anda sudah terverifikasi'
                            : 'Email anda belum terverifikasi'}
                    </span>
                    {!session?.user?.emailVerified && (
                        <Button size="sm" variant="secondary" onClick={handleResendVerification} disabled={isResendPending}>
                            {isResendPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Kirim Ulang
                        </Button>
                    )}
                </AlertDescription>
            </Alert>

            {/* Ubah Password */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Ubah Password
                    </CardTitle>
                    <CardDescription>
                        Ubah password akun anda secara berkala untuk keamanan
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleChangePassword}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Password Saat Ini</Label>
                            <Input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Password Baru</Label>
                                <Input
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Konfirmasi Password Baru</Label>
                                <Input
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isPasswordPending}>
                            {isPasswordPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ubah Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Ubah Email */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Ubah Alamat Email
                    </CardTitle>
                    <CardDescription>
                        Email saat ini: <strong>{session?.user?.email}</strong>
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleChangeEmail}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email Baru</Label>
                            <Input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isEmailPending || !newEmail}>
                            {isEmailPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ubah Email
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Separator />

            {/* Hapus Akun */}
            <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                        <Trash2 className="h-5 w-5" />
                        Hapus Akun
                    </CardTitle>
                    <CardDescription>
                        Semua data anda akan dihapus permanen dan tidak bisa dikembalikan.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeletePending}>
                        {isDeletePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Hapus Akun Saya
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}