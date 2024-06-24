import { Key, PaginationParams, RequestCallback, SearchResponse } from '.';
/** System-level announcement. */
export interface Announcement extends Key {
    /** Content */
    content: string;
    /** Date (timestamp) */
    date: number;
    /** Active flag */
    active: boolean;
    /** Read flag */
    read?: boolean;
}
export interface GetAnnouncementResponse {
    announcement: Announcement;
}
export interface GetAnnouncementsParams extends Omit<PaginationParams, 'sort'> {
    unread?: boolean;
}
export interface MarkAnnouncementsRequest {
    account: string;
    announcements: string[];
}
export interface MarkAnnouncementsResponse {
    announcements: string[];
    message: string;
}
export declare function getAnnouncement(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetAnnouncementResponse>;
export declare function getAnnouncements(host: string, token: string, params?: GetAnnouncementsParams, cb?: RequestCallback): Promise<SearchResponse<Announcement>>;
export declare function markAnnouncementsRead(host: string, token: string, data: MarkAnnouncementsRequest, cb?: RequestCallback): Promise<MarkAnnouncementsResponse>;
export declare function markAnnouncementsUnread(host: string, token: string, data: MarkAnnouncementsRequest, cb?: RequestCallback): Promise<MarkAnnouncementsResponse>;
