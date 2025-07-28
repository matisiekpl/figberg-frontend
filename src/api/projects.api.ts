import type {Project} from "@/types/project.ts";
import api from "@/api/api.ts";

async function add(link: string): Promise<Project> {
    const response = await api.post('/projects', {link});
    return response.data as Project;
}

async function list(): Promise<Project[]> {
    const response = await api.get('/projects');
    return response.data as Project[];
}

async function find(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data as Project;
}

async function sync(project: Project): Promise<void> {
    await api.post(`/projects/${project.id}/sync`);
}

async function render(project: Project): Promise<void> {
    await api.post(`/projects/${project.id}/render`);
}

export const projectsApi = {add, list, sync, find, render}