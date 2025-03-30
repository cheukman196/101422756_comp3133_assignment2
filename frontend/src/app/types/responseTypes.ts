export interface BaseResponseType {
    success: boolean;
    message: string;
}

export interface LoginResponseType extends BaseResponseType {
    token: string | null;
}

export interface RegisterResponseType extends BaseResponseType {
    user: {
        username: string;
        email: string;
        created_at: string;
    }
}