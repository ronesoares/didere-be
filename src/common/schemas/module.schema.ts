import * as Joi from 'joi';

export const createModuleSchema = Joi.object({
  name: Joi.string().max(45).required(),
  idSystem: Joi.number().integer().positive().required(),
});

export const updateModuleSchema = Joi.object({
  name: Joi.string().max(45).optional(),
  idSystem: Joi.number().integer().positive().optional(),
});

