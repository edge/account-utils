import { Key, RequestCallback } from '.';
export interface NewsletterSubscriber extends Key {
    email: string;
    isSubscribed: boolean;
}
export interface GetNewsletterSubscriptionResponse {
    subscriber: NewsletterSubscriber;
}
export interface SubscribeToNewsletterRequest {
    account: string;
}
export interface SubscribeToNewsletterResponse {
    subscriber: NewsletterSubscriber;
}
export interface UnsubscribeFromNewsletterRequest {
    account: string;
}
export interface UnsubscribeFromNewsletterResponse {
    subscriber: NewsletterSubscriber;
}
export declare function getNewsletterSubscription(host: string, token: string, cb?: RequestCallback): Promise<GetNewsletterSubscriptionResponse>;
export declare function subscribeToNewsletter(host: string, token: string, data: SubscribeToNewsletterRequest, cb?: RequestCallback): Promise<SubscribeToNewsletterResponse>;
export declare function unsubscribeFromNewsletter(host: string, token: string, data: UnsubscribeFromNewsletterRequest, cb?: RequestCallback): Promise<UnsubscribeFromNewsletterResponse>;
