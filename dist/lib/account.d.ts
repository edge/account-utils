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
export interface AddAccountEmailRequest {
    account: string;
    address: string;
}
export interface AddAccountEmailResponse {
    account: Account;
    message: string;
}
export interface AddAccountTOTPRequest {
    account: string;
    secret?: string;
    otp?: string;
}
export interface AddAccountTOTPResponse {
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
    entitlement?: promo.PromoEntitlement;
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
export interface RemoveAccountEmailRequest {
    account: string;
}
export interface RemoveAccountEmailResponse {
    account: Account;
    message: string;
}
export interface RemoveAccountTOTPRequest {
    account: string;
    totp?: string;
    otp?: string;
    backupCode?: string;
}
export interface RemoveAccountTOTPResponse {
    /** Excluded if the account does not have a TOTP. */
    account?: Account;
    message: string;
}
export interface ResendAccountVerificationEmailData {
    account: string;
}
export interface ResendAccountVerificationEmailResponse {
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
export interface UpdateAccountEmailRequest {
    account: string;
    address: string;
}
export interface UpdateAccountEmailResponse {
    account: Account;
    message: string;
}
export interface VerifyAccountEmailRequest {
    account: string;
    secret: string;
}
export interface VerifyAccountEmailResponse {
    account: Account;
    message: string;
}
export interface VerifyMagicLinkTokenResponse {
    account: string;
    address: string;
    message: string;
}
export declare function addAccountEmail(host: string, token: string, data: AddAccountEmailRequest, cb?: RequestCallback): Promise<AddAccountEmailResponse>;
export declare function addAccountTOTP(host: string, token: string, data: AddAccountTOTPRequest, cb?: RequestCallback): Promise<AddAccountTOTPResponse>;
export declare function createAccount(host: string, data?: CreateAccountRequest, cb?: RequestCallback): Promise<CreateAccountResponse>;
export declare function getAccount(host: string, token: string, cb?: RequestCallback): Promise<GetAccountResponse>;
export declare function getAccountProgress(host: string, token: string, cb?: RequestCallback): Promise<GetProgressResponse>;
export declare function getAccountReferredAccounts(host: string, token: string, cb?: RequestCallback): Promise<GetReferredAccountsResponse>;
export declare function removeAccountEmail(host: string, token: string, data: RemoveAccountEmailRequest, cb?: RequestCallback): Promise<RemoveAccountEmailResponse>;
export declare function removeAccountTOTP(host: string, token: string, data: RemoveAccountTOTPRequest, cb?: RequestCallback): Promise<RemoveAccountTOTPResponse>;
export declare function resendAccountVerificationEmail(host: string, token: string, data: ResendAccountVerificationEmailData, cb?: RequestCallback): Promise<ResendAccountVerificationEmailResponse>;
export declare function sendAccountMagicLink(host: string, data: SendMagicLinkRequest, cb?: RequestCallback): Promise<SendMagicLinkResponse>;
export declare function updateAccount(host: string, token: string, data: UpdateAccountRequest, cb?: RequestCallback): Promise<UpdateAccountResponse>;
export declare function updateAccountEmail(host: string, token: string, data: UpdateAccountEmailRequest, cb?: RequestCallback): Promise<UpdateAccountEmailResponse>;
export declare function verifyAccountEmail(host: string, token: string, data: VerifyAccountEmailRequest, cb?: RequestCallback): Promise<VerifyAccountEmailResponse>;
export declare function verifyAccountMagicLinkToken(host: string, token: string, cb?: RequestCallback): Promise<VerifyMagicLinkTokenResponse>;
