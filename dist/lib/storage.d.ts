import { PaginationParams, RequestCallback, SearchResponse } from '.';
export interface File {
    integration: string;
    id: string;
    filename: string;
    path: string;
    size: number;
    created: number;
    lastModified: number;
}
export interface Node {
    integration: string;
    file?: string;
    fullPath: string;
    depth: number;
    size: number;
    created: number;
    lastModified: number;
}
export interface CreateStorageNodeResponse {
    node: Node;
}
export interface DeleteStorageFilesRequest {
    files: string[];
}
export interface DeleteStorageFilesResponse {
    deleted: string[];
}
export interface DeleteStorageNodeResponse {
    node?: Node;
    affected: number;
}
export interface GetStorageFilesParams extends Omit<PaginationParams, 'sort'> {
}
export interface GetStorageNodeParams extends PaginationParams {
    foldersTop?: boolean;
}
export interface GetStorageNodeResponse {
    node?: Node;
    children: Node[];
    childrenMetadata: {
        count: number;
        limit: number;
        page: number;
        totalCount: number;
    };
}
export interface UpdateStorageFilesRequest {
    files: Pick<File, 'id' | 'filename' | 'path'>[];
}
export interface UpdateStorageFilesResponse {
    files: File[];
    failed: string[];
}
export interface UpdateStorageNodeRequest {
    fullPath: string;
}
export interface UpdateStorageNodeResponse {
    node?: Node;
    affected: number;
}
export type UploadStorageFileResponse = File;
export declare function createStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<CreateStorageNodeResponse>;
export declare function deleteStorageFiles(host: string, token: string, key: string, data: DeleteStorageFilesRequest, cb?: RequestCallback): Promise<DeleteStorageFilesResponse>;
export declare function deleteStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<DeleteStorageNodeResponse>;
export declare function getStorageFiles(host: string, token: string, key: string, params?: GetStorageFilesParams, cb?: RequestCallback): Promise<SearchResponse<File>>;
export declare function getStorageNode(host: string, token: string, key: string, path: string, params?: GetStorageNodeParams, cb?: RequestCallback): Promise<GetStorageNodeResponse>;
export declare function updateStorageFiles(host: string, token: string, key: string, data: UpdateStorageFilesRequest, cb?: RequestCallback): Promise<UpdateStorageFilesResponse>;
export declare function updateStorageNode(host: string, token: string, key: string, path: string, data: UpdateStorageNodeRequest, cb?: RequestCallback): Promise<UpdateStorageNodeResponse>;
/**
 * Upload a file to a Gateway (**not** the Account API).
 */
export declare function uploadStorageFile(gateway: string, apiKey: string, key: string, path: string, file: string, cb?: RequestCallback): Promise<UploadStorageFileResponse>;
