import { LRUCache } from 'lru-cache'
import { env } from './env'

interface RateLimitInfo {
    count: number
    resetTime: number
}

const cache = new LRUCache<string, RateLimitInfo>({
    max: 5000,
    ttl: 60 * 1000, // 1 menit
})

const MAX_REQUESTS = env.RATE_LIMIT_MAX
const WINDOW_MS = 60 * 1000

export async function checkRateLimit(identifier: string): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
}> {
    const now = Date.now()
    const existing = cache.get(identifier)

    if (!existing || existing.resetTime < now) {
        const resetTime = now + WINDOW_MS
        cache.set(identifier, {
            count: 1,
            resetTime,
        })

        return {
            success: true,
            limit: MAX_REQUESTS,
            remaining: MAX_REQUESTS - 1,
            reset: resetTime,
        }
    }

    if (existing.count >= MAX_REQUESTS) {
        return {
            success: false,
            limit: MAX_REQUESTS,
            remaining: 0,
            reset: existing.resetTime,
        }
    }

    existing.count += 1
    cache.set(identifier, existing)

    return {
        success: true,
        limit: MAX_REQUESTS,
        remaining: MAX_REQUESTS - existing.count,
        reset: existing.resetTime,
    }
}

export function getIpFromRequest(request: Request): string {
    const headers = request.headers
    return (
        headers.get('x-forwarded-for') ??
        headers.get('x-real-ip') ??
        'unknown'
    )
}