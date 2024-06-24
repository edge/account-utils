import { RequestCallback } from '.';
export type CdnGraphRange = 'daily' | 'hourly';
export interface DeleteCdnCacheRequest {
    path: string;
}
export interface DeleteCdnCacheResponse {
    message: string;
}
export interface GetCdnGraphDataResponse {
    /** Timestamp */
    ts: number[];
    /** Requests (total) */
    r: number[];
    /** Requests (total; bytes) */
    t: number[];
    /** Cached requests (%) */
    cr: number[];
    /** Cached traffic (%) */
    ct: number[];
    /** Bandwidth (bps) */
    b: number[];
}
export declare function deleteCdnCache(host: string, token: string, key: string, data: DeleteCdnCacheRequest, cb?: RequestCallback): Promise<DeleteCdnCacheResponse>;
export declare function getCdnGraphData(host: string, token: string, key: string, range: CdnGraphRange, cb?: RequestCallback): Promise<GetCdnGraphDataResponse>;
