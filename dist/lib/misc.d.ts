import { RequestCallback } from '.';
export interface ParseDomainResponse {
    domain: string;
    apex: boolean;
}
/** Parse a domain to determine whether it is an apex or subdomain. */
export declare function parseDomain(host: string, token: string, domain: string, cb?: RequestCallback): Promise<ParseDomainResponse>;
