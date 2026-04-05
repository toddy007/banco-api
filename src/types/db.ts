export interface UserSchema {
    username: string;
    email: string;
    password: string;
    balance: number;
    transictions: TransictionHistory[];
    createdDate: Date;
}

export type Account = Omit<UserSchema, 'password' | 'balance' | 'transictions' | 'createdDate'>;

export interface TransictionHistory {
    type: TransictionType;
    accountManaged: Account;
    amount: number;
    date: Date;
}

export enum TransictionType {
    Received = 'received',
    Sent = 'sent',
}