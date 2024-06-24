import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
export interface Task extends Key, Timestamps {
    /** Account key */
    account?: string;
    /** Entity ID (full path - not just key) */
    entity: string;
    /** Action (description of task) */
    action: string;
    /** Batch identifier (for local grouping) */
    batch?: string;
    /** Sort order within batch */
    position?: number;
    /** Task ID */
    task: number;
    /** Task data/parameters (if any) */
    data?: unknown;
    /** Status */
    status: 'created' | 'complete' | 'expired' | 'failed' | 'gone' | 'running';
}
export interface GetTaskResponse {
    task: Task;
}
export interface GetTasksParams extends PeriodParams, PaginationParams {
    key?: string | string[];
    account?: string | string[];
    batch?: string | string[];
    entity?: string | string[];
    action?: string | string[];
    status?: string | string[];
}
export declare function getTask(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetTaskResponse>;
export declare function getTasks(host: string, token: string, params?: GetTasksParams, cb?: RequestCallback): Promise<SearchResponse<Task>>;
