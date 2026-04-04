import Fastify from 'fastify';
import { handleStart } from './handlers/handleStart';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { userModel } from './database/modelExports';
import { connect } from 'mongoose';

export const webserver = Fastify();

webserver.setValidatorCompiler(validatorCompiler);
webserver.setSerializerCompiler(serializerCompiler);

handleStart(webserver);

await connect(process.env.MONGODB!)
console.log('[MONGODB] Database connected')

export const db = {
    users: userModel,
}
