import type {Project} from "@/types/project.ts";
import type {Node} from "@/types/node.ts";
import api from "@/api/api.ts";

async function list(project: Project): Promise<Node[]> {
    const response = await api.get(`projects/${project.id}/nodes`);
    return response.data as Node[];
}

export const nodesApi = {list};