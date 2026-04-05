import { RouteOptions } from 'fastify';
import { z } from 'zod';
import { db } from '../';
import { compareSync } from 'bcrypt-ts';
import { TransictionType } from '../types/db';
import { emailDefault, passwordDefault } from '../utils/defaultZodTypes';
import { errorDefault, replyDefault } from '../utils/defaultResponses';

export default {
    method: 'POST',
    url: '/transfer',
    schema: {
        body: z.object({
            email: emailDefault,
            password: passwordDefault,
            userEmailToTransfer: emailDefault,
            amount: z.number().int('Amount must be a integer').gte(1, 'Amount must be greater than 0').lte(1000000, 'Amount must be less than 1.000.000') // por algum motivo isso retorna Bad Request inves da mensagem
        }),
        response: {
            200: replyDefault,
            404: errorDefault,
            401: errorDefault,
            400: errorDefault,
        },
    },
    handler: async (request, reply) => {
        const { email, password, userEmailToTransfer, amount } = request.body as TransferBody;

        const user = await db.users.findOne({ email });
        if (!user)
            return reply.status(404).send({ error: 'Email not registered.' });

        const correctPassword = compareSync(password, user.password);
        if (!correctPassword)
            return reply.status(401).send({ error: 'Incorrect password.' });

        const userToTransfer = await db.users.findOne({ email: userEmailToTransfer });
        if (!userToTransfer)
            return reply.status(404).send({ error: 'User to transfer not registered.' });

        if (user.balance < amount)
            return reply.status(400).send({ error: 'You don\'t have enough balance to transfer.' });

        user.balance -= amount;
        userToTransfer.balance += amount;

        user.transictions.push({
            type: TransictionType.Sent,
            accountManaged: {
                username: userToTransfer.username,
                email: userToTransfer.email,
            },
            amount,
            date: new Date(),
        });
        userToTransfer.transictions.push({
            type: TransictionType.Received,
            accountManaged: {
                username: user.username,
                email: user.email,
            },
            amount,
            date: new Date(),
        });

        await user.save();
        await userToTransfer.save();

        return reply.status(200).send({ message: 'You transferred ' + amount + ' successfully.' });
    },
} as RouteOptions;

export interface TransferBody {
    email: string;
    password: string;
    userEmailToTransfer: string;
    amount: number;
}