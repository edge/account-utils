import type * as promo from './promo';
import type * as session from './session';
import { Key, RequestCallback, Timestamps } from '.';
/**
 * An account provides access to features of the account system.
 */
export interface Account extends Key, Timestamps {
    /** XE wallet */
    wallet: {
        address: string;
    };
    /** Referral code (for other, new accounts) */
    referralCode: string;
    /** Account email */
    email?: {
        /** Email address */
        address?: string;
        /** Verification secret */
        secret: string;
        /** Verification secret expiry time */
        secretExpiry: number;
        /** Unverified email address, will be transferred to `address` once verified */
        unverifiedAddress?: null | string;
    };
    /** Stripe data */
    stripe?: {
        customer: {
            id: string;
        };
    };
    /** Automatic top-up settings */
    topup?: null | {
        /** Payment method key */
        paymentMethod?: string | null;
    };
    /** Two-factor authentication count */
    totps?: number;
    /** Beta service access */
    betaServices?: string[];
    /** Registration source. */
    source?: string;
    /**
     * Setup flag.
     * Indicates whether the account has completed first-time setup.
     */
    isSetup?: boolean;
    /**
     * Use crypto view flag.
     * Indicates whether the account prefers fiat-only view or will see XE as well.
     */
    useCryptoView?: boolean;
    /**
     * Managed account flag.
     * If true, the account is exempt from some billing effects.
     */
    managed?: boolean;
    /** Suspended service flag */
    suspended?: boolean;
    /** Warned of low balance flag */
    warned?: boolean;
    /** Disabled account flag. */
    disabled?: boolean;
}
export interface AddEmailRequest {
    account: string;
    address: string;
}
export interface AddEmailResponse {
    account: Account;
    message: string;
}
export interface AddTOTPRequest {
    secret?: string;
    otp?: string;
}
export interface AddTOTPResponse {
    account: Account;
    totp: {
        _key: string;
        backupCodes: string[];
    };
}
export interface CreateAccountRequest {
    address?: string;
    promoCode?: string;
    referralCode?: string;
    source?: string;
}
export interface CreateAccountResponse {
    account: Account;
    entitlement?: promo.Entitlement;
    session: session.Session;
}
export interface GetAccountResponse {
    account: Account;
}
export interface GetProgressResponse {
    all: boolean;
    payment: boolean;
    service: boolean;
}
export interface GetReferredAccountsResponse {
    metadata: {
        totalCount: number;
    };
}
export interface RemoveEmailRequest {
    account: string;
}
export interface RemoveEmailResponse {
    account: Account;
    message: string;
}
export interface RemoveTOTPRequest {
    account: string;
    totp?: string;
    otp?: string;
    backupCode?: string;
}
export interface RemoveTOTPResponse {
    /** Excluded if the account does not have a TOTP. */
    account?: Account;
    message: string;
}
export interface ResendVerificationEmailData {
    account: string;
}
export interface ResendVerificationEmailResponse {
    account: Account;
    message: string;
}
export interface SendMagicLinkRequest {
    /** Email address associated with an account. */
    address: string;
}
export interface SendMagicLinkResponse {
    address?: string;
    message: string;
}
export interface UpdateAccountRequest {
    account: string;
    isSetup?: boolean;
    useCryptoView?: boolean;
}
export interface UpdateAccountResponse {
    account: Account;
}
export interface UpdateEmailRequest {
    account: string;
    address: string;
}
export interface UpdateEmailResponse {
    account: Account;
    message: string;
}
export interface VerifyEmailRequest {
    account: string;
    secret: string;
}
export interface VerifyEmailResponse {
    account: Account;
    message: string;
}
export interface VerifyMagicLinkTokenResponse {
    account: string;
    address: string;
    message: string;
}
export declare function addAccountEmail(host: string, token: string, data: AddEmailRequest, cb?: RequestCallback): Promise<AddEmailResponse>;
export declare function addAccountTOTP(host: string, token: string, data: AddTOTPRequest, cb?: RequestCallback): Promise<AddTOTPResponse>;
export declare function createAccount(host: string, data?: CreateAccountRequest, cb?: RequestCallback): Promise<CreateAccountResponse>;
export declare function getAccount(host: string, token: string, cb?: RequestCallback): Promise<GetAccountResponse>;
export declare function getAccountProgress(host: string, token: string, cb?: RequestCallback): Promise<GetProgressResponse>;
export declare function getAccountReferredAccounts(host: string, token: string, cb?: RequestCallback): Promise<GetReferredAccountsResponse>;
export declare function removeAccountEmail(host: string, token: string, data: RemoveEmailRequest, cb?: RequestCallback): Promise<RemoveEmailResponse>;
export declare function removeAccountTOTP(host: string, token: string, data: RemoveTOTPRequest, cb?: RequestCallback): Promise<RemoveTOTPResponse>;
export declare function resendAccountVerificationEmail(host: string, token: string, data: ResendVerificationEmailData, cb?: RequestCallback): Promise<ResendVerificationEmailResponse>;
export declare function sendAccountMagicLink(host: string, data: SendMagicLinkRequest, cb?: RequestCallback): Promise<SendMagicLinkResponse>;
export declare function updateAccount(host: string, token: string, data: UpdateAccountRequest, cb?: RequestCallback): Promise<UpdateAccountResponse>;
export declare function updateAccountEmail(host: string, token: string, data: UpdateEmailRequest, cb?: RequestCallback): Promise<UpdateEmailResponse>;
export declare function verifyAccountEmail(host: string, token: string, data: VerifyEmailRequest, cb?: RequestCallback): Promise<VerifyEmailResponse>;
export declare function verifyAccountMagicLinkToken(host: string, token: string, cb?: RequestCallback): Promise<VerifyMagicLinkTokenResponse>;
