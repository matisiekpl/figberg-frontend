import {defineStore} from "pinia";
import {useRoute, useRouter} from "vue-router";
import type {LoadingState} from "@/types/loadingState.ts";
import {computed, ref} from "vue";
import type {Project} from "@/types/project.ts";
import type {Node} from "@/types/node.ts";
import {projectsApi} from "@/api/projects.api.ts";
import {nodesApi} from "@/api/nodes.api.ts";
import {wait} from "@/lib/utils.ts";

export const useProjectStore = defineStore('project', () => {
    const route = useRoute();
    const router = useRouter();
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
        if (project.value) {
            const previousPercent = availableNodesPercent.value;
            nodes.value = await nodesApi.list(project.value);
            const currentPercent = availableNodesPercent.value;
            
            if (previousPercent < 100 && currentPercent === 100) {
                await invalidate();
                await wait(5000);

                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.src;
                    img.src = '';
                    img.src = src;
                });
            }
        }
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

    const cacheInvalidationCounter = ref<number>(150);

    async function invalidate(): Promise<void> {
        if (!project.value) return;
        projectsApi.invalidate(project.value);
        cacheInvalidationCounter.value = 0;
        await wait(200);
        for (let i = 0; i < 150; i++) {
            cacheInvalidationCounter.value++;
            await wait(10);
        }
        project.value = await projectsApi.find(project.value.id);
    }

    async function destroy(): Promise<void> {
        if (!project.value) return;
        if (confirm('Are you sure you want to delete this project?')) {
            await projectsApi.destroy(project.value);
            await router.push(`/projects`);
        }
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
        render,
        cacheInvalidationCounter,
        invalidate,
        destroy,
    };
});