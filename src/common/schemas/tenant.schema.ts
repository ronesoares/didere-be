import * as Joi from 'joi';

export const createTenantSchema = Joi.object({
  name: Joi.string().max(60).required(),
  phoneNumber: Joi.string().max(12).required(),
  email: Joi.string().email().max(50).required(),
  document: Joi.string().max(15).optional(),
  birthday: Joi.date().optional(),
  idAddress: Joi.number().integer().positive().optional(),
});

export const updateTenantSchema = Joi.object({
  name: Joi.string().max(60).optional(),
  phoneNumber: Joi.string().max(12).optional(),
  email: Joi.string().email().max(50).optional(),
  document: Joi.string().max(15).optional(),
  birthday: Joi.date().optional(),
  idAddress: Joi.number().integer().positive().optional(),
});

