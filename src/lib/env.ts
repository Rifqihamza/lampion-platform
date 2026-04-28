import { z } from 'zod'

const envSchema = z.object({
    // Application
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    APP_URL: z.string().url(),

    // Database
    DATABASE_URL: z.string().url(),

    // Auth
    NEXTAUTH_SECRET: z.string().min(32),
    NEXTAUTH_URL: z.string().url().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),

    // Email
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    SMTP_FROM: z.string().email(),

    // OpenAI
    OPENAI_API_KEY: z.string().optional(),

    // Security
    CORS_ORIGIN: z.string().default('*'),
    RATE_LIMIT_MAX: z.coerce.number().default(100),
})


const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error('⚠️  Missing environment variables:')
    console.error(JSON.stringify(parsed.error.format(), null, 2))

    // Di development hanya kasih warning, tidak throw error agar bisa jalan
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Invalid environment variables')
    }

    console.warn('⚠️  Running in development mode with missing environment variables. Some features may not work.')
}

// Default fallback jika parsing gagal di development
export const env = parsed.success ? parsed.data : {
    NODE_ENV: 'development',
    APP_URL: 'http://localhost:3000',
    DATABASE_URL: '',
    NEXTAUTH_SECRET: 'dev-secret-key-123456789012345678901234567890',
    NEXTAUTH_URL: undefined,
    AUTH_GOOGLE_ID: undefined,
    AUTH_GOOGLE_SECRET: undefined,
    SMTP_HOST: '',
    SMTP_PORT: 587,
    SMTP_USER: '',
    SMTP_PASS: '',
    SMTP_FROM: '',
    OPENAI_API_KEY: undefined,
    CORS_ORIGIN: '*',
    RATE_LIMIT_MAX: 100,
}
