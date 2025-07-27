import {defineStore} from "pinia";
import {authApi} from "@/api/auth.api.ts";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);

    async function login() {
        const loginResponse = await authApi.login(window.location.href);
        window.location.href = loginResponse.loginUrl;
    }

    async function exchange() {
        loading.value = true;
        const token = await authApi.exchange(route.query.code as string, route.query.state as string);
        localStorage.setItem("access_token", token);
        loading.value = false;
        await router.push("/projects");
    }

    async function logout() {
        localStorage.removeItem("access_token");
        await router.push("/login");
    }

    return {login, exchange, loading, logout}
});