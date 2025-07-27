import api from "@/api/api.ts";
import type {User} from "@/types/user.ts";

async function me(): Promise<User> {
    const response = await api.get('auth/me');
    return response.data as User;
}

export const userApi = {me};