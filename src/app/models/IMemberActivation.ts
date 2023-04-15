
export interface Address {
    street: string
    city: string
    building: number
}

export interface IMemberActivation {
    _id: number,
    password: string,
    newpassword: string,
    image: string,
    phone_number: string,
    birth_date: Date,
    address: Address,
    activated?: boolean,
}