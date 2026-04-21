import { ResetPasswordInput } from "@/lib/validators/auth";

export interface ApiResponse<T = unknown> {
    message: string;
    data?: T;
    error?: string;
}

export interface ResetPasswordRequest extends ResetPasswordInput {
    token: string;
}