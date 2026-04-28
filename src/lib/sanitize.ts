/**
 * Sanitize user input untuk menghindari XSS dan injection
 * Semua input user harus melewati fungsi ini sebelum masuk database
 */

export function sanitizeString(input: unknown): string {
    if (typeof input !== 'string') {
        return ''
    }

    return input
        .trim()
        .replace(/[<>]/g, '') // Hapus tag HTML
        .replace(/javascript:/gi, '') // Block javascript protocol
        .replace(/on\w+=/gi, '') // Block event handler
        .replace(/script/gi, 's c r i p t') // Neutralize script tag
}

export function sanitizeEmail(input: unknown): string {
    if (typeof input !== 'string') {
        return ''
    }

    return input
        .trim()
        .toLowerCase()
        .replace(/\s/g, '')
}

export function sanitizeNumber(input: unknown): number | null {
    const num = Number(input)
    return isNaN(num) ? null : num
}

export function sanitizeBoolean(input: unknown): boolean {
    if (typeof input === 'boolean') return input
    if (input === 'true') return true
    if (input === 'false') return false
    return Boolean(input)
}

// Sanitize object secara rekursif
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            result[key] = sanitizeString(value)
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            result[key] = sanitizeObject(value as Record<string, unknown>)
        } else {
            result[key] = value
        }
    }

    return result as T
}