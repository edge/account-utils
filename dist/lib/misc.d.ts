import { RequestCallback } from '.';
export interface GetConfigResponse {
    billing: {
        minimumBillableUnit: number;
    };
    cdn: {
        dataCost: number;
        dataCostBasis: number;
        minimumCost: number;
        minimumCostBasis: number;
        minimumTTL: number;
        requestCost: number;
        requestCostBasis: number;
    };
    dns: {
        cost: number;
        costBasis: number;
        nameservers: string[];
        recordTypes: string[];
    };
    server: {
        limit: {
            bandwidth: {
                min: number;
                max: number;
            };
            cpu: {
                min: number;
                max: number;
            };
            disk: {
                min: number;
                max: number;
            };
            ram: {
                min: number;
                max: number;
            };
        };
    };
    suspend: {
        threshold: number;
    };
    warning: {
        threshold: number;
    };
}
export interface GetInfoResponse {
    name: string;
    version: string;
}
export interface ParseDomainResponse {
    domain: string;
    apex: boolean;
}
export declare function getConfig(host: string, cb?: RequestCallback): Promise<GetConfigResponse>;
export declare function getInfo(host: string, cb?: RequestCallback): Promise<GetInfoResponse>;
/** Parse a domain to determine whether it is an apex or subdomain. */
export declare function parseDomain(host: string, token: string, domain: string, cb?: RequestCallback): Promise<ParseDomainResponse>;
