import * as Joi from 'joi';

export const createFileSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  type: Joi.string().max(10).required(),
  size: Joi.number().positive().required(),
  moduleId: Joi.number().integer().positive().required(),
  keyModuleId: Joi.number().integer().positive().required(),
  ownerId: Joi.number().integer().positive().required(),
  systemId: Joi.number().integer().positive().required(),
  creationUserId: Joi.number().integer().positive().required(),
});

export const updateFileSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  type: Joi.string().max(10).optional(),
  size: Joi.number().positive().optional(),
  moduleId: Joi.number().integer().positive().optional(),
  keyModuleId: Joi.number().integer().positive().optional(),
  ownerId: Joi.number().integer().positive().optional(),
  systemId: Joi.number().integer().positive().optional(),
  creationUserId: Joi.number().integer().positive().optional(),
});

