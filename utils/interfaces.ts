export interface Address {
    address_id: string;
    mobile: string;
    name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    address_type: string;
    email?: string;
    selected: boolean;
}

export interface NewAddress {
    mobile: string;
    name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    address_type: string;
    email?: string;
}

export interface Addresses {
    mobile: string;
    turbo_address_list: Address[];
    unifill_address_list: Address[];
}