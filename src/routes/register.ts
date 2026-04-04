import { RouteOptions } from 'fastify';
import { z } from 'zod';
const usernameValidatorRegex = /^(?!.*\s{2,})(?!\s)(?!.*\s$)[a-zA-ZÀ-ÿ\s]+$/;
const passwordValidatorRegex = /^(?=\S+$)(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=(?:.*[0-9]){4,})(?=.*[\W_]).+$/;

export default {
    method: 'POST',
    url: '/register',
    querystring: z.object({
        username: z.string().regex(usernameValidatorRegex),
        email: z.email(),
        password: z.string().regex(passwordValidatorRegex),
    }),
    handler: (request, reply) => {
        
    },
} as RouteOptions;