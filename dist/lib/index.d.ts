export * from './account';
export * from './announcement';
export * from './bareMetal';
export * from './billing';
export * from './cdn';
export * from './dns';
export * from './error';
export * from './integration';
export * from './misc';
export * from './newsletter';
export * from './notification';
export * from './os';
export * from './product';
export * from './promo';
export * from './region';
export * from './server';
export * from './serverBackup';
export * from './service';
export * from './session';
export * from './storage';
export * from './task';
import type { SuperAgentRequest } from 'superagent';
export interface Key {
    _key: string;
}
export interface PaginationParams<T extends string = string> {
    limit?: number;
    page?: number;
    sort?: T | T[];
}
export interface PeriodParams {
    since?: number;
    until?: number;
}
/**
 * Callback function allowing a SuperAgent HTTP request to be modified before it is sent.
 * https://visionmedia.github.io/superagent/
 */
export interface RequestCallback {
    (r: SuperAgentRequest): SuperAgentRequest;
}
export interface SearchResponse<T> {
    results: T[];
    metadata: {
        count: number;
        limit: number;
        page: number;
        totalCount: number;
    };
}
export interface Timestamps {
    created?: number;
    updated?: number;
}
