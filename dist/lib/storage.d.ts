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
/**
 * Create a [folder] node in a storage integration.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to [folder] node
 * @return New node data
 */
export declare function createStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<CreateStorageNodeResponse>;
export declare function deleteStorageFiles(host: string, token: string, key: string, data: DeleteStorageFilesRequest, cb?: RequestCallback): Promise<DeleteStorageFilesResponse>;
/**
 * Delete a node.
 * If the node is a folder, then its child nodes are deleted automatically by API.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @return Old node data
 */
export declare function deleteStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<DeleteStorageNodeResponse>;
export declare function getStorageFiles(host: string, token: string, key: string, params?: GetStorageFilesParams, cb?: RequestCallback): Promise<SearchResponse<File>>;
/**
 * Get a node.
 * If the node is a folder, then its child nodes are also retrieved in a list, subject to the `params` provided.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param params Query parameters for child nodes
 */
export declare function getStorageNode(host: string, token: string, key: string, path: string, params?: GetStorageNodeParams, cb?: RequestCallback): Promise<GetStorageNodeResponse>;
export declare function updateStorageFiles(host: string, token: string, key: string, data: UpdateStorageFilesRequest, cb?: RequestCallback): Promise<UpdateStorageFilesResponse>;
/**
 * Update a node.
 * If the node is a folder, then its child nodes will be updated automatically by API as applicable to the update.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param data Node update data
 * @return Updated node data
 */
export declare function updateStorageNode(host: string, token: string, key: string, path: string, data: UpdateStorageNodeRequest, cb?: RequestCallback): Promise<UpdateStorageNodeResponse>;
/**
 * Upload a file to a Gateway (**not** directly to the Account API).
 *
 * @param host Gateway URL (**not** API base URL)
 * @param apiKey Integration API key
 * @param key Integration key
 * @param path Path to file
 * @param file File data
 * @return Gateway response with UUID
 */
export declare function uploadStorageFile(gateway: string, apiKey: string, key: string, path: string, file: string, cb?: RequestCallback): Promise<UploadStorageFileResponse>;
