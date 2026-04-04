import { RouteOptions } from 'fastify';
import { z } from 'zod';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { db } from '../';
const usernameValidatorRegex = /^(?!.*\s{2,})(?!\s)(?!.*\s$)[a-zA-ZÀ-ÿ\s]+$/;
const passwordValidatorRegex = /^(?=\S+$)(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=(?:.*[0-9]){4,})(?=.*[\W_]).+$/;

export default {
    method: 'POST',
    url: '/register',
    schema: {
        querystring: z.object({
            username: z.string().max(100).regex(usernameValidatorRegex),
            email: z.email(),
            password: z.string().regex(passwordValidatorRegex),
        }),
    },
    handler: async (request, reply) => {
        const { username, email, password } = request.query as RegisterQuery;

        const user = await db.users.findOne({ email }, ['_id']);
        if (user) 
            return reply
                .status(409)
                .send({ error: 'Email already registered.' })
        
        const salt = genSaltSync(10);
        const passwordHash = hashSync(password, salt);

        await db.users.create({
            username,
            email,
            password: passwordHash,
            createdDate: new Date(),
        });

        return reply
            .status(201)
            .send({ message: 'User created successfully.' });
    },
} as RouteOptions;

export interface RegisterQuery {
    username: string;
    email: string;
    password: string;
}