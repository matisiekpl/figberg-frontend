import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/Login/LoginView.vue";
import ProjectsView from "@/views/Projects/ProjectsView.vue";
import ProjectView from "@/views/Project/ProjectView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/login', component: LoginView},
    {path: '/projects', component: ProjectsView},
    {path: '/projects/:id', component: ProjectView},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})