import { RouteOptions } from 'fastify';
import { z } from 'zod';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { db } from '../';
import { usernameDefault, emailDefault, passwordDefault } from '../utils/defaultZodTypes';
import { errorDefault, replyDefault } from '../utils/defaultResponses'; 

export default {
    method: 'POST',
    url: '/register',
    schema: {
        body: z.object({
            username: usernameDefault,
            email: emailDefault,
            password: passwordDefault,
        }),
        response: {
            201: replyDefault,
            409: errorDefault,
        },
    },
    handler: async (request, reply) => {
        const { username, email, password } = request.body as RegisterBody;

        const user = await db.users.findOne({ email }, ['_id']);
        if (user) 
            return reply
                .status(409)
                .send({ error: 'Email already registered' })
        
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
            .send({ message: 'User created successfully' });
    },
} as RouteOptions;

export interface RegisterBody {
    username: string;
    email: string;
    password: string;
}