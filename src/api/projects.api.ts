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

export const projectsApi = {add, list}