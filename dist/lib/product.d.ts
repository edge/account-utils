import { Key, PaginationParams, RequestCallback, SearchResponse, Timestamps } from '.';
/** Generic price type. */
export type Price = PriceFixed | PriceFlatRate;
export interface PriceFixed {
    type: 'fixed';
    /** Cost (USD) */
    cost: number;
    /** Indivisible flag */
    indivisible: true;
}
/**
 * Flat rate pricing definition.
 * A fixed USD `cost` is charged over a `costBasis` in hours.
 */
export interface PriceFlatRate {
    type: 'flatRate';
    /** Cost (USD) */
    cost: number;
    /** Cost basis (hours) */
    costBasis: number;
    /** Indivisible flag */
    indivisible: false;
}
/** Product */
export interface Product<T extends Price = Price> extends Key, Timestamps {
    /** Name of product (for reference) */
    name: string;
    /** Summary (used in billing) */
    summary: string;
    /** Price for product subscription */
    price: T;
    /** Minimum duration of a subscription (hours) */
    minDuration?: number;
    /** Active flag */
    active: boolean;
    internal?: boolean;
}
export interface ProductSubscription extends Key, Timestamps {
    /** Account key */
    account: string;
    /** Subscription key */
    product: string;
    /** Active flag */
    active: boolean;
    /** Suspended flag */
    suspended?: boolean;
}
export interface GetProductResponse {
    product: Product;
}
export interface GetProductSubscriptionsRequest extends Omit<PaginationParams, 'sort'> {
}
export interface SubscribeToProductResponse {
    subscription: ProductSubscription;
    message: string;
}
export interface UnsubscribeFromProductResponse {
    subscription: ProductSubscription;
    message: string;
}
/** @todo require token */
export declare function getProduct(host: string, token: string | undefined, key: string, cb?: RequestCallback): Promise<GetProductResponse>;
export declare function getProductSubscriptions(host: string, token: string, params?: GetProductSubscriptionsRequest, cb?: RequestCallback): Promise<SearchResponse<ProductSubscription>>;
export declare function subscribeToProduct(host: string, token: string, key: string, cb?: RequestCallback): Promise<SubscribeToProductResponse>;
export declare function unsubscribeFromProduct(host: string, token: string, key: string, cb?: RequestCallback): Promise<UnsubscribeFromProductResponse>;
