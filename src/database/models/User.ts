import { model, Schema } from 'mongoose';
import { UserSchema } from '../../types/db';

const userSchema = new Schema<UserSchema>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        balance: { type: Number, required: true, default: 0 },
        transictions: { type: [Object], required: true, default: [] },
        createdDate: { type: Date, required: true },
    },
    { versionKey: false },
);

export const userModel = model('users', userSchema);