import { RouteOptions } from 'fastify';
import { z } from 'zod';
import { db } from '../';
import { compareSync } from 'bcrypt-ts';
import { emailDefault, passwordDefault } from '../utils/defaultZodTypes';
import { errorDefault } from '../utils/defaultResponses';

export default {
    method: 'POST',
    url: '/transictions',
    schema: {
        body: z.object({
            email: emailDefault,
            password: passwordDefault,
        }),
        response: {
            200: z.object({
                transictions: z.array(z.object({
                    type: z.string(),
                    accountManaged: z.object({
                        username: z.string(),
                        email: z.email(),
                    }),
                    amount: z.number(),
                    date: z.date(),
                })),
            }),
            404: errorDefault,
            401: errorDefault,
        },
    },
    handler: async (request, reply) => {
        const { email, password } = request.body as TransictionsBody;

        const user = await db.users.findOne({ email }, ['password', 'transictions']);
        if (!user)
            return reply.status(404).send({ error: 'Email not registered' });

        const correctPassword = compareSync(password, user.password);
        if (!correctPassword)
            return reply.status(401).send({ error: 'Incorrect password' });

        return reply.status(200).send({ transictions: user.transictions });
    },
} as RouteOptions;

export interface TransictionsBody {
    email: string;
    password: string;
}