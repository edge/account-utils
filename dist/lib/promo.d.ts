import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
export interface Promo extends Key, Timestamps {
    name: string;
    active: boolean;
    start: number | null;
    end: number | null;
    newAccountOnly: boolean;
    config: PromoConfig;
    codeConfig: PromoCodeConfig;
    comments?: string;
}
export interface PromoCreditConfig {
    type: 'credit';
    /** Amount in USD */
    amount: number;
}
export type PromoCodeConfig = PromoSingleCodeConfig;
export type PromoConfig = PromoCreditConfig | PromoDiscountConfig;
export interface PromoDiscountConfig {
    type: 'discount';
    mode: 'fixed' | 'percentage';
    /** Amount in USD or %, depending on mode */
    amount: number;
}
export interface PromoEntitlement extends Key, Timestamps {
    account: string;
    code?: string;
    promo: Promo;
    expires?: number | null;
    credit?: {
        remaining: number;
    };
    status: 'active' | 'consume' | 'expired' | 'partConsumed' | 'void';
}
export interface PromoSingleCodeConfig {
    type: 'single';
    code: string;
    maxUses: number;
    maxConcurrentUses: number;
    expiry: PromoSingleCodeExpiryConfig;
}
export type PromoSingleCodeExpiryConfig = {
    type: 'never';
} | {
    type: 'withPromo';
} | {
    type: 'days';
    days: number;
} | {
    type: 'daysOrWithPromo';
    days: number;
};
export interface DeletePromoEntitlementResponse {
    entitlement: PromoEntitlement;
}
export interface GetPromoEntitlementResponse {
    entitlement: PromoEntitlement;
}
export interface GetPromoEntitlementsParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    account?: string | string[];
    promo?: string | string[];
    status?: string | string[];
}
export interface RedeemPromoCodeRequest {
    account: string;
    code?: string;
}
export interface RedeemPromoCodeResponse {
    entitlement: PromoEntitlement;
}
export declare function deletePromoEntitlement(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeletePromoEntitlementResponse>;
export declare function getPromoEntitlement(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetPromoEntitlementResponse>;
export declare function getPromoEntitlements(host: string, token: string, params?: GetPromoEntitlementsParams, cb?: RequestCallback): Promise<SearchResponse<PromoEntitlement>>;
/** Redeem promo code. */
export declare function redeemPromoCode(host: string, token: string, data: RedeemPromoCodeRequest, cb?: RequestCallback): Promise<RedeemPromoCodeResponse>;
/**
 * Redeem promo code (alternate form).
 * This allows validating a code against a specific promotion.
 */
export declare function redeemPromoCode(host: string, token: string, key: string, data: RedeemPromoCodeRequest, cb?: RequestCallback): Promise<RedeemPromoCodeResponse>;
