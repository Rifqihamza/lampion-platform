import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { env } from './env'

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
} as SMTPTransport.Options)

interface EmailOptions {
    to: string
    subject: string
    html: string
}

export async function sendEmail(options: EmailOptions) {
    try {
        await transporter.sendMail({
            from: env.SMTP_FROM,
            to: options.to,
            subject: options.subject,
            html: options.html,
        })
        return true
    } catch (error) {
        console.error('Failed to send email:', error)
        return false
    }
}

// Email Templates
export const verificationEmailTemplate = (name: string, verificationUrl: string) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="padding: 20px;">
        <h2>Verifikasi Email Anda</h2>
        <p>Halo ${name || 'Pengguna'},</p>
        <p>Terima kasih telah mendaftar di Lampion Platform. Silahkan klik tombol dibawah untuk memverifikasi email anda:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Verifikasi Email
            </a>
        </div>
        
        <p>Jika anda tidak merasa mendaftar, anda bisa mengabaikan email ini.</p>
        <p>Link berlaku selama 1 jam.</p>
    </div>
</body>
</html>
`

export const passwordResetEmailTemplate = (resetUrl: string) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="padding: 20px;">
        <h2>Reset Password</h2>
        <p>Kami menerima permintaan untuk mereset password akun anda.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Reset Password
            </a>
        </div>
        
        <p>Jika anda tidak meminta reset password, abaikan email ini.</p>
        <p>Link berlaku selama 15 menit.</p>
    </div>
</body>
</html>
`