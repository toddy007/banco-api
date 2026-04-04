import { RouteOptions } from 'fastify';

export default {
    method: 'GET', // use array for multiple methods
    url: '/',
    handler: (request, reply) => {
        return reply.send('Hello World!');
    },
} as RouteOptions;