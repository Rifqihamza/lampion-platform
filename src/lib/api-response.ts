import { z } from 'zod'

export interface ApiSuccessResponse<T = unknown> {
    success: true
    data: T
    message?: string
    pagination?: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

export interface ApiErrorResponse {
    success: false
    error: string
    code: string
    details?: Record<string, string[]>
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

// Success Response Factory
export function success<T>(data: T, message?: string): ApiSuccessResponse<T> {
    return {
        success: true,
        data,
        message,
    }
}

export function successPaginated<T>(
    data: T,
    pagination: { page: number; limit: number; total: number },
    message?: string
): ApiSuccessResponse<T> {
    return {
        success: true,
        data,
        message,
        pagination: {
            ...pagination,
            totalPages: Math.ceil(pagination.total / pagination.limit),
        },
    }
}

// Error Response Factory
export function error(
    message: string,
    code: string = 'INTERNAL_ERROR',
    details?: Record<string, string[]>
): ApiErrorResponse {
    return {
        success: false,
        error: message,
        code,
        details,
    }
}

// Zod Validation Error Handler
export function handleZodError(err: z.ZodError): ApiErrorResponse {
    const errors: Record<string, string[]> = {}

    for (const issue of err.issues) {
        const path = issue.path.join('.')
        if (!errors[path]) {
            errors[path] = []
        }
        errors[path].push(issue.message)
    }

    return error('Validation failed', 'VALIDATION_ERROR', errors)
}

// HTTP Response Helpers
export function jsonResponse<T>(response: ApiResponse<T>, status: number = 200) {
    return Response.json(response, {
        status,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}