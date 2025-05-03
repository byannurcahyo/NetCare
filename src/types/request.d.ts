export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface CreateTransaction {
    userId: string;
    fullName: string;
    phoneNumber: string;
    packageId: string;
    packageName: string;
    price: number;
    status: string;
    date: string;
}

export interface UpdateTransaction {
    id: string;
    status: string;
}
