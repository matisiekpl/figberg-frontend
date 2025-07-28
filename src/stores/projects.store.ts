import {defineStore} from "pinia";
import type {Project} from "@/types/project.ts";
import {ref} from "vue";
import {type LoadingState} from "@/types/loadingState.ts";
import {projectsApi} from "@/api/projects.api.ts";

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>();
    const state = ref<LoadingState>('Initialized');

    const importing = ref<boolean>(false);

    const link = ref<string>('');

    async function add() {
        importing.value = true;
        await projectsApi.add(link.value);
        await list();
        link.value = '';
        importing.value = false;
    }

    async function list() {
        projects.value = await projectsApi.list();
    }

    return {projects, state, importing, link, add, list}
});