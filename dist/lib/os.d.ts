import { Key, RequestCallback, SearchResponse } from '.';
/** OS image */
export interface OS extends Key {
    /** Backend ID */
    id: number;
    /** Group */
    group: string;
    /** Sort order within group */
    position?: number;
    /** Version */
    version: string;
    /** Active flag */
    active: boolean;
}
export interface GetOSParams {
    limit?: number;
    page?: number;
}
export interface GetOSResponse {
    os: OS;
}
export declare function getOperatingSystem(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetOSResponse>;
export declare function getOperatingSystems(host: string, token: string, params?: GetOSParams, cb?: RequestCallback): Promise<SearchResponse<OS>>;
