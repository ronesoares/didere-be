import * as Joi from 'joi';

export const createSellerSchema = Joi.object({
  name: Joi.string().max(60).required(),
  token: Joi.string().max(6).required(),
  status: Joi.string().max(1).required(),
  commissionPercentage: Joi.number().precision(2).required(),
  idSystem: Joi.number().integer().positive().required(),
});

export const updateSellerSchema = Joi.object({
  name: Joi.string().max(60).optional(),
  token: Joi.string().max(6).optional(),
  status: Joi.string().max(1).optional(),
  commissionPercentage: Joi.number().precision(2).optional(),
  idSystem: Joi.number().integer().positive().optional(),
});

