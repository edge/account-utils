import { Key, RequestCallback, SearchResponse, Timestamps } from '.';
/** DNS zone */
export interface DnsZone extends Key, Timestamps {
    /** Account key */
    account: string;
    /** Nameserver status */
    ns?: {
        /** Confirmed flag; indicates whether NS records for the zone point correctly to Edge DNS */
        confirmed: boolean;
        /** Last check timestamp */
        lastChecked: number;
    };
    /** Active flag */
    active: boolean;
    /** Suspended flag */
    suspended?: boolean;
    /** DNS records count */
    records?: Record<string, number>;
}
export interface CreateDnsZoneRequest {
    account: string;
    zone: string;
}
export interface CreateDnsZoneResponse {
    zone: DnsZone;
    message: string;
}
export interface DeleteDnsZoneResponse {
    zone: DnsZone;
    message: string;
}
export interface GetDnsZoneResponse {
    zone: DnsZone;
}
export interface GetDnsZonesParams {
    key?: string | string[];
    account?: string | string[];
    active?: boolean;
    suspended?: boolean;
    ns?: boolean;
    since?: number;
    until?: number;
    limit?: number;
    page?: number;
    search?: string;
    sort?: string | string[];
}
export declare function createDnsZone(host: string, token: string, data: CreateDnsZoneRequest, cb?: RequestCallback): Promise<CreateDnsZoneResponse>;
export declare function deleteDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<DeleteDnsZoneResponse>;
export declare function getDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<GetDnsZoneResponse>;
export declare function getDnsZones(host: string, token: string, params?: GetDnsZonesParams, cb?: RequestCallback): Promise<SearchResponse<DnsZone>>;
