
export interface Address {
    street?: string
    city?: string
    building?: number
}

export interface IMembers {
    id?: number,
    full_name: string,
    email: string,
    password: string,
    image?: string,
    phone_number?: string,
    birth_date?: Date,
    address?: Address,
    last_login?: Date,
    ban_date?: Date,
    activated?: Boolean,
    created_at?: Date,
    updated_at?: Date,
}