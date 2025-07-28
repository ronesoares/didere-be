import * as Joi from 'joi';

export const createAccessSchema = Joi.object({
  insert: Joi.string().max(1).valid('Y', 'N').default('Y'),
  update: Joi.string().max(1).valid('Y', 'N').default('Y'),
  delete: Joi.string().max(1).valid('Y', 'N').default('Y'),
  search: Joi.string().max(1).valid('Y', 'N').default('Y'),
  idModule: Joi.number().integer().positive().required(),
  idProfile: Joi.number().integer().positive().required(),
});

export const updateAccessSchema = Joi.object({
  insert: Joi.string().max(1).valid('Y', 'N').optional(),
  update: Joi.string().max(1).valid('Y', 'N').optional(),
  delete: Joi.string().max(1).valid('Y', 'N').optional(),
  search: Joi.string().max(1).valid('Y', 'N').optional(),
  idModule: Joi.number().integer().positive().optional(),
  idProfile: Joi.number().integer().positive().optional(),
});

