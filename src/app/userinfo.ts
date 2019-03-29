export interface UserInfo {
    sub: string;
    name?: string;
    given_name?:	string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?:	string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: AddressClaim;
    updated_at?: number;
}

export interface AddressClaim {

    formatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
}
