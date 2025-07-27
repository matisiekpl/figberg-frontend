import {defineStore} from "pinia";
import type {User} from "@/types/user.ts";
import {ref} from "vue";
import {userApi} from "@/api/user.api.ts";
import {useRouter} from "vue-router";

export const useUserStore = defineStore('user', () => {
    const user = ref<User>();
    const loaded = ref(false);
    const router = useRouter();

    async function load() {
        if (window.location.href.includes('login')) return;
        if (!localStorage.getItem('access_token')) {
            return await router.push('/login');
        }
        user.value = await userApi.me();
        loaded.value = true;
    }

    return {user, load, loaded};
});