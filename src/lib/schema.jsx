import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z
    .string()
    .transform(val => Number.parseInt(val, 10))
    .refine(val => !Number.isNaN(val) && val > 0)
    .or(z.number())
    .catch(1),
  limit: z
    .string()
    .transform(val => Number.parseInt(val, 10))
    .refine(val => !Number.isNaN(val) && val > 0)
    .or(z.number())
    .catch(10),
})

export const LoginSchema = z.object({
  email: z.string().email('Enter a valid email').nonempty('Email is required'),
  password: z.string().min(6, 'Minimum 6 characters required').nonempty('Password is required'),
});

export const BanUserSchema = z.object({
  type: z.string().nonempty("Ban type is required"),
  reason: z.string().min(1, "Reason is required").nonempty("Reason is required"),
  note: z.string().min(1, "Note is required").max(500, "Note must be under 500 characters").optional(),
});