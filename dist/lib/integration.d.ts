import { Config } from '@edge/cache-config';
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
/**
 * Integration as saved to an account.
 */
export interface AccountIntegration<I extends Integration = Integration> extends Key, Timestamps {
    /** Account key */
    account: string;
    /** Integration name */
    name: string;
    /** Integration data */
    data: Omit<I, 'id'>;
    /** Config mode */
    configMode?: 'advanced' | 'default' | 'simple';
    /** Active flag */
    active: boolean;
    /** Suspended flag */
    suspended?: boolean;
}
/**
 * CDN configuration.
 */
export interface ContentDeliveryConfig {
    domain: string;
    additionalDomains?: string[];
    cache?: Config;
    origin: string;
    maxAssetSize?: number;
    requestTimeout?: number;
    retryTimeout?: number;
}
/**
 * CDN integration.
 */
export interface ContentDeliveryIntegration {
    id: string;
    service: 'cdn';
    config: ContentDeliveryConfig;
}
/**
 * Integration.
 * Can be any type of integration, and should be disambiguated in user code based on `service`.
 */
export type Integration = ContentDeliveryIntegration | PageIntegration | StorageIntegration;
export interface IntegrationUsage {
    start: number;
    end: number;
    cdn: {
        requests: {
            cached: number;
            uncached: number;
        };
        data: {
            in: {
                uncached: number;
            };
            out: {
                cached: number;
                uncached: number;
            };
        };
    };
}
/** Page configuration. */
export interface PageConfig {
    domain: string;
    content: string;
}
/** Page integration. */
export interface PageIntegration {
    id: string;
    service: 'page';
    config: PageConfig;
}
/** Storage API key. */
export interface StorageAPIKey {
    active: boolean;
}
/**
 * Storage configuration.
 */
export interface StorageConfig {
    apiKeys?: Record<string, StorageAPIKey>;
}
/**
 * Storage integration.
 */
export interface StorageIntegration {
    id: string;
    service: 'storage';
    config: StorageConfig;
}
export interface CheckIntegrationDnsRecordsResponse {
    records: {
        domain: string;
        zone?: string;
        recordExists?: string;
    }[];
}
export type CreateIntegrationRequest<I extends Integration> = Pick<AccountIntegration<I>, 'account' | 'name' | 'data' | 'configMode'>;
export interface CreateIntegrationResponse<I extends Integration> {
    integration: AccountIntegration<I>;
}
export interface DeleteIntegrationResponse<I extends Integration> {
    integration: AccountIntegration<I>;
}
export interface GetInstantIntegrationUsageParams {
    integration?: string | string[];
    account?: string;
}
export interface GetInstantIntegrationUsageResponse {
    [key: string]: IntegrationUsage;
}
export type GetIntegrationUsageResponse = IntegrationUsage[];
export interface GetIntegrationResponse<I extends Integration> {
    integration: AccountIntegration<I>;
}
export interface GetIntegrationsParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    account?: string | string[];
    name?: string | string[];
    domain?: string | string[];
    service?: string | string[];
    active?: boolean;
    suspended?: boolean;
    search?: string;
}
export type UpdateIntegrationRequest = Pick<AccountIntegration, 'account' | 'name' | 'data' | 'configMode'>;
export interface UpdateIntegrationResponse<I extends Integration = Integration> {
    integration: AccountIntegration<I>;
}
export type UsageDataRange = 'daily' | 'hourly';
export declare function checkIntegrationDnsRecords(host: string, token: string, key: string, cb?: RequestCallback): Promise<CheckIntegrationDnsRecordsResponse>;
export declare function createIntegration<I extends Integration = Integration>(host: string, token: string, data: CreateIntegrationRequest<I>, cb?: RequestCallback): Promise<CreateIntegrationResponse<I>>;
export declare function deleteIntegration<I extends Integration = Integration>(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeleteIntegrationResponse<I>>;
export declare function getInstantIntegrationUsage(host: string, token: string, params?: GetInstantIntegrationUsageParams, cb?: RequestCallback): Promise<GetInstantIntegrationUsageResponse>;
export declare function getIntegration<I extends Integration = Integration>(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetIntegrationResponse<I>>;
export declare function getIntegrationUsage(host: string, token: string, key: string, range: UsageDataRange, cb?: RequestCallback): Promise<GetIntegrationUsageResponse>;
export declare function getIntegrations<I extends Integration = Integration>(host: string, token: string, params?: GetIntegrationsParams, cb?: RequestCallback): Promise<SearchResponse<AccountIntegration<I>>>;
export declare function updateIntegration<I extends Integration = Integration>(host: string, token: string, key: string, data: UpdateIntegrationRequest, cb?: RequestCallback): Promise<UpdateIntegrationResponse<I>>;
