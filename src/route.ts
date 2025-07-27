import HelloWorld from "@/components/HelloWorld.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', component: HelloWorld},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})