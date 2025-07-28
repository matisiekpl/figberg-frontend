import {defineStore} from "pinia";
import {useRoute} from "vue-router";
import type {LoadingState} from "@/types/loadingState.ts";
import {computed, ref} from "vue";
import type {Project} from "@/types/project.ts";
import type {Node} from "@/types/node.ts";
import {projectsApi} from "@/api/projects.api.ts";
import {nodesApi} from "@/api/nodes.api.ts";

export const useProjectStore = defineStore('project', () => {
    const route = useRoute();
    const state = ref<LoadingState>('Initialized');
    const project = ref<Project>();
    const nodes = ref<Node[]>();
    const search = ref<string>('');
    const syncing = ref<boolean>(false);

    async function init() {
        state.value = 'Loading';

        const projectID = route.params['id'] as string;
        project.value = await projectsApi.find(projectID);
        nodes.value = await nodesApi.list(project.value);

        state.value = 'Loaded';
    }

    async function reload() {
        if (project.value)
            nodes.value = await nodesApi.list(project.value);
    }

    async function sync(): Promise<void> {
        if (!project.value) return;
        syncing.value = true;
        await projectsApi.sync(project.value);
        syncing.value = false;
    }

    async function render(): Promise<void> {
        if (!project.value) return;
        await projectsApi.render(project.value);
    }

    const filteredNodes = computed(() => nodes.value?.filter((node) => node.name.toLowerCase().includes(search.value)));
    const availableNodesCount = computed(() => nodes.value?.filter((node) => node.available).length ?? 0);
    const availableNodesPercent = computed(() => Math.round(availableNodesCount.value / (nodes.value?.length ?? 0) * 100));

    return {
        route,
        init,
        project,
        nodes,
        filteredNodes,
        search,
        reload,
        syncing,
        sync,
        state,
        availableNodesCount,
        availableNodesPercent,
        render
    };
});