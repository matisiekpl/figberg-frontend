import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {Project} from "@/types/project.ts";
import type {Node} from "@/types/node.ts"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function viewInFigma(project: Project, node: Node | undefined = undefined) {
    window.open('https://www.figma.com/design/' + project.fileKey + (node ? '?node-id=' + node.nodeId.replace(':', '-') : ''), '_blank');
}