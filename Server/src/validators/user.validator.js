'use strict';

const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(8).max(72),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  }),
});

const updateSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z
    .object({
      name: z.string().min(2).max(120).optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).max(72).optional(),
      role: z.enum(['user', 'admin']).optional(),
      isActive: z.boolean().optional(),
    })
    .refine((d) => Object.keys(d).length > 0, { message: 'No fields to update' }),
});

const idParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

const listSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().optional(),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateSchema,
  idParamSchema,
  listSchema,
};
