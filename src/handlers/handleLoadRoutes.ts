import { FastifyInstance, RouteOptions } from 'fastify';
import globSync from 'tiny-glob';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

export const handleLoadRoutes = async (webserver: FastifyInstance) => {
    const routesPath = await globSync('./src/routes/*.ts');

    for (const routePath of routesPath) {
        const { default: route }: { default: RouteOptions } = await import('../../' + routePath);
        console.log('[ROUTE] Route "' + route.url + '" loaded');

        webserver
            .withTypeProvider<ZodTypeProvider>()
            .route(route);
    };
};