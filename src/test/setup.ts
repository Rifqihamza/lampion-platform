import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
}))

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    useSession: () => ({
        data: null,
        status: 'unauthenticated',
        update: vi.fn(),
    }),
    signIn: vi.fn(),
    signOut: vi.fn(),
}))

// Mock sonner toast
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
    },
}))