import * as Joi from 'joi';

export const createSystemSchema = Joi.object({
  name: Joi.string().max(45).required(),
});

export const updateSystemSchema = Joi.object({
  name: Joi.string().max(45).optional(),
});

