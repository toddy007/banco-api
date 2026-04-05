import { z } from 'zod';

export const replyDefault = z.object({
    message: z.string(),
});

export const errorDefault = z.object({
    error: z.string()
});