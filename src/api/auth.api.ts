import type {LoginResponse} from "@/types/loginResponse.ts";
import api from "@/api/api.ts";
import type {ExchangeResponse} from "@/types/exchangeResponse.ts";

async function login(redirectUrl: string): Promise<LoginResponse> {
    const response = await api.get('auth/login?redirect_uri=' + encodeURIComponent(redirectUrl.split('?')[0]));
    return await response.data as LoginResponse;
}

async function exchange(code: string, redirectUrl: string): Promise<string> {
    const response = await api.post('auth/exchange?code=' + code + '&redirect_uri=' + encodeURIComponent(redirectUrl.split('?')[0]));
    return (response.data as ExchangeResponse).token;
}

export const authApi = {login, exchange};