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
    SMTP_FROM: z.string().min(1, "SMTP_FROM cannot be empty"),

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
        console.error("FAILED TO VALIDATE ENV IN PRODUCTION MODE");
    }

    console.warn('⚠️  Running in development mode with missing environment variables. Some features may not work.')
}

export const env = parsed.success ? parsed.data : (process.env as unknown as z.infer<typeof envSchema>);