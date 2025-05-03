export interface User {
    id: string;
    fullName: string;
    username: string;
    password?: string;
    email: string;
    role: string;
}

export interface Package {
    id: string;
    name: string;
    data: string;
    bonus: string;
    duration: string;
    price: number;
    description: string;
}

export interface Transaction {
    id: string;
    userId: string;
    fullName: string;
    phoneNumber: string;
    packageId: string;
    packageName: string;
    price: number;
    status: string;
    date: string;
}
