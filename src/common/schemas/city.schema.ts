import * as Joi from 'joi';

export const createCitySchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().max(60).required(),
  idState: Joi.number().integer().positive().required(),
});

export const updateCitySchema = Joi.object({
  name: Joi.string().max(60).optional(),
  idState: Joi.number().integer().positive().optional(),
});

