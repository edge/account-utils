import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
/** DNS record */
export interface DnsRecord extends Key, Timestamps {
    /** Zone key */
    zone: string;
    /** Account key */
    account: string;
    /** DNS record name (subdomain) */
    name: string;
    /** DNS record type */
    type: string;
    /** DNS record value */
    value: string;
    /** DNS record TTL */
    ttl: number;
}
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
export interface CreateDnsZoneRecordRequest extends Pick<DnsRecord, 'account' | 'name' | 'ttl' | 'type' | 'value'> {
}
export interface CreateDnsZoneRecordResponse {
    record: DnsRecord;
    synced: DnsRecord[];
    message: string;
}
export interface CreateDnsZoneRequest {
    account: string;
    zone: string;
}
export interface CreateDnsZoneResponse {
    zone: DnsZone;
    message: string;
}
export interface DeleteDnsZoneRecordResponse {
    record: DnsRecord;
    message: string;
}
export interface DeleteDnsZoneResponse {
    zone: DnsZone;
    message: string;
}
export interface GetDnsZoneRecordResponse {
    record: DnsRecord;
}
export interface GetDnsZoneRecordsParams extends PaginationParams {
    account?: string | string[];
    name?: string | string[];
    type?: string | string[];
    ttl?: number;
}
export interface GetDnsZoneResponse {
    zone: DnsZone;
}
export interface GetDnsZonesParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    account?: string | string[];
    active?: boolean;
    suspended?: boolean;
    ns?: boolean;
    search?: string;
}
export interface UpdateDnsZoneRecordRequest extends Pick<DnsRecord, 'account' | 'name' | 'ttl' | 'type' | 'value'> {
}
export interface UpdateDnsZoneRecordResponse {
    record: DnsRecord;
    synced: DnsRecord[];
    message: string;
}
export declare function createDnsZone(host: string, token: string, data: CreateDnsZoneRequest, cb?: RequestCallback): Promise<CreateDnsZoneResponse>;
export declare function createDnsZoneRecord(host: string, token: string, zone: string, data: CreateDnsZoneRecordRequest, cb?: RequestCallback): Promise<CreateDnsZoneRecordResponse>;
export declare function deleteDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<DeleteDnsZoneResponse>;
export declare function deleteDnsZoneRecord(host: string, token: string, zone: string, key: string, cb?: RequestCallback): Promise<DeleteDnsZoneRecordResponse>;
export declare function getDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<GetDnsZoneResponse>;
export declare function getDnsZoneRecord(host: string, token: string, zone: string, key: string, cb?: RequestCallback): Promise<GetDnsZoneRecordResponse>;
export declare function getDnsZoneRecords(host: string, token: string, zone: string, params?: GetDnsZoneRecordsParams, cb?: RequestCallback): Promise<SearchResponse<DnsRecord>>;
export declare function getDnsZones(host: string, token: string, params?: GetDnsZonesParams, cb?: RequestCallback): Promise<SearchResponse<DnsZone>>;
export declare function updateDnsZoneRecord(host: string, token: string, zone: string, key: string, data: UpdateDnsZoneRecordRequest, cb?: RequestCallback): Promise<UpdateDnsZoneRecordResponse>;
