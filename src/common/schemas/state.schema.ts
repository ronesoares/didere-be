import * as Joi from 'joi';

export const createStateSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string().max(45).required(),
  abbreviation: Joi.string().max(2).required(),
});

export const updateStateSchema = Joi.object({
  name: Joi.string().max(45).optional(),
  abbreviation: Joi.string().max(2).optional(),
});

