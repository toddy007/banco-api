import { FastifyInstance } from 'fastify';
import { handleLoadRoutes } from './handleLoadRoutes';

const port = 8080;

export const handleStart = async (webserver: FastifyInstance) => {
    await handleLoadRoutes(webserver);
    
    webserver.listen(
        { port }, 
        () => console.log(`[RUN] Webserver running on port ${port}, access http://localhost:${port}`)
    );
}