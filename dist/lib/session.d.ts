import { Key, RequestCallback, Timestamps } from '.';
/**
 * A session provides authentication to authenticated APIs.
 * The session `_key` is the bearer token that should be provided.
 */
export interface Session extends Key, Timestamps {
    account: string;
}
export interface CreateSessionRequest {
    account: string;
    otp?: string;
    backupCode?: string;
}
export interface CreateSessionResponse {
    session: Session;
    message: string;
}
export interface DeleteSessionResponse {
    session: Session;
    message: string;
}
export interface GetSessionResponse {
    session: Session;
}
export interface UpdateSessionResponse {
    session: Session;
    message: string;
}
export declare function createSession(host: string, data?: CreateSessionRequest, cb?: RequestCallback): Promise<CreateSessionResponse>;
export declare function deleteSession(host: string, token: string, cb?: RequestCallback): Promise<DeleteSessionResponse>;
export declare function getSession(host: string, token: string, cb?: RequestCallback): Promise<GetSessionResponse>;
export declare function updateSession(host: string, token: string, cb?: RequestCallback): Promise<UpdateSessionResponse>;
