export interface UserSchema {
    _id: string;
    username: string;
    email: string;
    password: string;
    balance: number;
    transictions: TransictionHistory[]
    createdDate: Date
}

export type Account = Exclude<UserSchema, 'password' | 'balance' | 'createdDate' | 'transictions'>;

export interface TransictionHistory {
    _id: string;
    type: TransictionType;
    accountManaged: Account;
    amount: number;
    date: Date;
}

export enum TransictionType {
    Received,
    Sent,
}