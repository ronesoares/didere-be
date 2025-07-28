import * as Joi from 'joi';

export const createAddressSchema = Joi.object({
  zipCode: Joi.string().max(10).required(),
  name: Joi.string().max(60).required(),
  neighborhood: Joi.string().max(60).required(),
  number: Joi.number().integer().positive().optional(),
  complement: Joi.string().max(100).optional(),
  idCity: Joi.number().integer().positive().required(),
  idState: Joi.number().integer().positive().required(),
});

export const updateAddressSchema = Joi.object({
  zipCode: Joi.string().max(10).optional(),
  name: Joi.string().max(60).optional(),
  neighborhood: Joi.string().max(60).optional(),
  number: Joi.number().integer().positive().optional(),
  complement: Joi.string().max(100).optional(),
  idCity: Joi.number().integer().positive().optional(),
  idState: Joi.number().integer().positive().optional(),
});

