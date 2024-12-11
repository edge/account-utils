import type * as server from './server';
import type * as task from './task';
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
export interface Vpn extends Key, Timestamps {
    /** Account number */
    account: string;
    /** Region key */
    region: string;
    /** Server key */
    server: string;
    /** Name */
    name: string;
    /** Multi-user flag */
    multiuser: boolean;
    /** Number of users */
    users: number;
    /** Speed */
    speed: VpnSpeed;
    /** Status (synchronised with server) */
    status: server.ServerStatus;
    /** Suspended service flag (administrative) */
    suspended?: boolean;
}
export type VpnSpeed = 'fast' | 'faster' | 'fastest';
export interface VpnUser extends Key, Timestamps {
    /** Account key */
    account: string;
    /** VPN key */
    vpn: string;
    /** Certificate name (AKA username) */
    certificate: string;
    /** Email address */
    email?: string | null;
    /** First name */
    firstName: string;
    /** Last name */
    lastName: string;
    /** Company */
    company: string;
    /** Department */
    department: string;
}
export interface CreateVpnRequest {
    vpn: Pick<Vpn, 'account' | 'region' | 'name' | 'multiuser' | 'speed'>;
}
export interface CreateVpnResponse {
    vpn: Vpn;
    server: server.Server;
    tasks: task.Task[];
    message: string;
}
export interface CreateVpnUserRequest {
    vpnUser: Pick<VpnUser, 'certificate' | 'email' | 'firstName' | 'lastName' | 'company' | 'department'>;
}
export interface CreateVpnUserResponse {
    vpn: Vpn;
    vpnUser: VpnUser;
}
export interface DeleteVpnResponse {
    vpn: Vpn;
    server: server.Server;
    task: task.Task;
    message: string;
}
export interface DeleteVpnUserResponse {
    vpn: Vpn;
    vpnUser: VpnUser;
}
export interface EmailVpnCertificateResponse {
    message: string;
}
export interface GetVpnResponse {
    vpn: Vpn;
}
export interface GetVpnUserResponse {
    vpnUser: VpnUser;
}
export interface GetVpnsParams extends PeriodParams, PaginationParams {
    key?: string | string[];
    account?: string | string[];
    region?: string | string[];
    server?: string | string[];
    status?: string | string[];
    suspended?: boolean;
    name?: string | string[];
    multiuser?: boolean;
    search?: string;
}
export interface GetVpnUsersParams extends PeriodParams, PaginationParams {
    vpn?: string | string[];
    key?: string | string[];
    account?: string | string[];
    search?: string;
}
export interface RenewVpnCertificateResponse {
    message: string;
}
export interface UpdateVpnRequest {
    vpn: Partial<Pick<Vpn, 'name' | 'multiuser' | 'speed'>>;
}
export interface UpdateVpnResponse {
    vpn: Vpn;
    server: server.Server;
    tasks: task.Task[];
    message: string;
}
export interface UpdateVpnUserRequest {
    vpnUser: Pick<VpnUser, 'email'>;
}
export interface UpdateVpnUserResponse {
    vpnUser: VpnUser;
}
export declare function createVpn(host: string, token: string, data: CreateVpnRequest, cb?: RequestCallback): Promise<CreateVpnResponse>;
export declare function createVpnUser(host: string, token: string, key: string, data: CreateVpnUserRequest, cb?: RequestCallback): Promise<CreateVpnUserResponse>;
export declare function deleteVpn(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeleteVpnResponse>;
export declare function deleteVpnUser(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<DeleteVpnUserResponse>;
export declare function emailVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<EmailVpnCertificateResponse>;
export declare function getVpn(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetVpnResponse>;
export declare function getVpns(host: string, token: string, params?: GetVpnsParams, cb?: RequestCallback): Promise<SearchResponse<Vpn>>;
/**
 * Download a VPN certificate (OpenVPN).
 */
export declare function getVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<Blob>;
/**
 * Download a VPN certificate (OpenVPN).
 * When a `filename` string is provided, this function attempts to download the PDF using a DOM workaround instead
 * of returning the data blob to the caller.
 * This will only work correctly in a web browser.
 *
 * @note **This implementation is experimental and requires cross-browser testing.**
 *       If you use this function, please provide feedback via https://github.com/edge/account-utils/issues
 */
export declare function getVpnCertificate(host: string, token: string, key: string, userKey: string, filename: string, cb?: RequestCallback): Promise<void>;
export declare function getVpnUser(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<GetVpnUserResponse>;
/**
 * Get VPN users.
 * If a VPN key is given, only users for that VPN will be retrieved.
 */
export declare function getVpnUsers(host: string, token: string, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>;
export declare function getVpnUsers(host: string, token: string, key: string, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>;
export declare function getVpnUsers(host: string, token: string, params: GetVpnUsersParams, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>;
export declare function getVpnUsers(host: string, token: string, key: string, params: GetVpnUsersParams, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>;
export declare function renewVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<RenewVpnCertificateResponse>;
export declare function updateVpn(host: string, token: string, key: string, data: UpdateVpnRequest, cb?: RequestCallback): Promise<UpdateVpnResponse>;
export declare function updateVpnUser(host: string, token: string, key: string, userKey: string, data: UpdateVpnUserRequest, cb?: RequestCallback): Promise<UpdateVpnUserResponse>;
