export interface Project {
    id: string;
    createdAt: string;
    updatedAt: string;
    fileKey: string;
    lastSyncAt: string;
    devMode: boolean;
    secret: string;
    previewUrl: string;
    name: string;
    cacheInvalidatedAt: string;
}