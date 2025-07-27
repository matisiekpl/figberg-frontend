import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/Login/LoginView.vue";
import ProjectsView from "@/views/Projects/ProjectsView.vue";

const routes = [
    {path: '/login', component: LoginView},
    {path: '/projects', component: ProjectsView},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})