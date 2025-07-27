import {defineStore} from "pinia";
import {authApi} from "@/api/auth.api.ts";
import {useRoute} from "vue-router";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {

    const route = useRoute();
    const loading = ref(false);

    async function login() {
        const loginResponse = await authApi.login(window.location.href);
        window.location.href = loginResponse.loginUrl;
    }

    async function exchange() {
        loading.value = true;
        const token = await authApi.exchange(route.query.code as string, route.query.state as string);
        console.log(token);
        loading.value = false;
    }

    return {login, exchange, loading}

});