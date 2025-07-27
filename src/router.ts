import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/Login/LoginView.vue";

const routes = [
    {path: '/login', component: LoginView},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})