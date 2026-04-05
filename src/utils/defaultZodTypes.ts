import { passwordValidatorRegex, usernameValidatorRegex } from './regex';
import { z } from 'zod';

export const emailDefault = z.email('Email must be a valid email and a string');

export const passwordDefault = z
    .string('Password must be a string')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordValidatorRegex, 'Password must contain at least 2 uppercase letters, 4 numbers, 1 symbol and no spaces')

export const usernameDefault = z
    .string('Username must be a string')
    .max(100, 'Username must be less than 100 characters')
    .regex(usernameValidatorRegex, 'Username must contain only letters and spaces; you can\'t use spaces in the start and at the end; you can\'t use space followed by another')