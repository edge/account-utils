import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.';
export interface Notification extends Key, Timestamps {
    /** Account key */
    account: string;
    /** Notification type ID */
    type: string;
    /** Notification text */
    text: string;
    /** Additional data */
    data?: Record<string, string | number | boolean | undefined>;
    /** Read flag */
    read?: boolean;
}
export type DeleteNotificationsRequest = Array<Key>;
export type DeleteNotificationsResponse = Notification[];
export interface GetNotificationsParams extends PaginationParams, PeriodParams {
    key?: string | string[];
    account?: string | string[];
    type?: string | string[];
    read?: boolean;
    search?: string;
}
export interface GetNotificationResponse {
    notification: Notification;
}
export interface UpdateAllNotificationsRequest {
    account: string;
    read: boolean;
}
export type UpdateAllNotificationsResponse = number;
export type UpdateNotificationsRequest = Array<Key & {
    read: boolean;
}>;
export type UpdateNotificationsResponse = Notification[];
export declare function deleteNotifications(host: string, token: string, data: DeleteNotificationsRequest, cb?: RequestCallback): Promise<DeleteNotificationsResponse>;
export declare function getNotification(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetNotificationResponse>;
export declare function getNotifications(host: string, token: string, params?: GetNotificationsParams, cb?: RequestCallback): Promise<SearchResponse<Notification>>;
export declare function updateAllNotifications(host: string, token: string, data: UpdateAllNotificationsRequest, cb?: RequestCallback): Promise<UpdateAllNotificationsResponse>;
export declare function updateNotifications(host: string, token: string, data: UpdateNotificationsRequest, cb?: RequestCallback): Promise<UpdateNotificationsResponse>;
