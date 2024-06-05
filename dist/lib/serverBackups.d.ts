import * as task from './task';
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
/** Server backup. */
export interface Backup extends Key, Timestamps {
    /** Account key */
    account: string;
    /** Server key */
    server: string;
    /** VM Backup ID */
    backup: number;
    /** VM Backup size in MiB */
    size?: number;
    /** Name */
    name: string;
    /** Comment */
    comment?: string;
    /** Status */
    status: 'active' | 'crashed' | 'creating' | 'deleted' | 'deleting';
    /** Expiry timestamp */
    expires?: number;
}
export interface CreateServerBackupRequest {
    comment?: string;
}
export interface CreateServerBackupResponse {
    backup: Backup;
    task: task.Task;
    message: string;
}
export interface DeleteServerBackupResponse {
    backup: Backup;
    task: task.Task;
    message: string;
}
export interface GetServerBackupResponse {
    backup: Backup;
}
export interface GetServerBackupsParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    account?: string | string[];
    server?: string | string[];
    status?: string | string[];
}
/** @todo review and patch: https://github.com/edge/account-api/issues/317 */
export interface GetServerBackupsUsageResponse {
    usage: number[];
}
export interface RestoreServerBackupResponse {
    backup: Backup;
    task: task.Task;
    message: string;
}
export declare function createServerBackup(host: string, token: string, server: string, data: CreateServerBackupRequest, cb?: RequestCallback): Promise<CreateServerBackupResponse>;
export declare function deleteServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<DeleteServerBackupResponse>;
export declare function getServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<GetServerBackupResponse>;
export declare function getServerBackupsUsage(host: string, token: string, server: string, cb?: RequestCallback): Promise<GetServerBackupsUsageResponse>;
export declare function getServerBackups(host: string, token: string, server: string, params?: GetServerBackupsParams, cb?: RequestCallback): Promise<SearchResponse<Backup>>;
export declare function restoreServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<RestoreServerBackupResponse>;
