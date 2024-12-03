import api from '../infrastructure/http';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// import { LoginResponse } from '../domain/models/LoginResponse';

import { ApiResponse } from '../types/shared/ApiResponse';
import { LoginResponse } from '../types/auth/LoginResponse';
import { DecodedToken } from '../types/auth/DecodedToken';

class AuthService {
    static async login(userName: string, password: string): Promise<void> {
        const response = await api.post<ApiResponse<LoginResponse>>('Auth/Authenticate', { userName, password });
        const { data } = response?.data;
        AuthService.setTokens(data.accessToken, data.refreshToken, AuthService.getTokenExpirationTime(data.accessToken));    
    }

    static logout(): void {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    }

    static isAuthenticated(): boolean {
        const token = Cookies.get('accessToken');
        if (!token) return false;
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    }

    static getTokenExpirationTime(token: string): Date {
        const decoded: any = jwtDecode(token);
        const tokenExpires = decoded.exp * 1000;
        const extendedExpirationTime = tokenExpires + 10 * 60 * 1000;

        return new Date(extendedExpirationTime);
    }

    static hasPermission(permission: string): boolean {
        const token = Cookies.get('accessToken');
        if (!token) return false;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return decoded.permissions?.includes(permission) || false;
        } catch (error) {
            console.error('Failed to decode access token:', error);
            return false;
        }
    }

    static async refreshToken(): Promise<string | null> {
        try {
            const refreshToken = Cookies.get('refreshToken');
            const accessToken = Cookies.get('accessToken');
            if (!refreshToken && accessToken) return null;

            const response = await api.post<ApiResponse<LoginResponse>>('Auth/RefreshToken', { accessToken, refreshToken });
            const { data } = response.data;

            AuthService.setTokens(data.accessToken, data.refreshToken, AuthService.getTokenExpirationTime(data.accessToken));
            return data.accessToken;
        } catch (error) {
            console.error('Erro ao atualizar o access token de acesso:', error);
            AuthService.logout();
            return null;
        }
    }

    private static setTokens(accessToken: string, refreshToken: string, tokenExpires: Date): void {
        Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict', expires: tokenExpires });
        Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict', expires: tokenExpires });
    }
}

export default AuthService;
