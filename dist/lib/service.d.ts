import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
export interface Service extends Key, Timestamps {
    public: boolean;
    beta: boolean;
}
export interface GetServicesParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    public?: string | string[];
    beta?: string | string[];
}
export declare function getServices(host: string, token: string, params?: GetServicesParams, cb?: RequestCallback): Promise<SearchResponse<Service>>;
