import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  login: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  status: Joi.string().valid('A', 'I').default('A'),
  isUserOwner: Joi.string().valid('Y', 'N').default('N'),
  profileId: Joi.number().integer().positive().required(),
  ownerId: Joi.number().integer().positive().required(),
  userRegistrationId: Joi.number().integer().positive().optional(),
  userLastUpdatedId: Joi.number().integer().positive().optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  login: Joi.string().email().max(50).optional(),
  password: Joi.string().min(6).max(100).optional(),
  status: Joi.string().valid('A', 'I').optional(),
  isUserOwner: Joi.string().valid('Y', 'N').optional(),
  profileId: Joi.number().integer().positive().optional(),
  ownerId: Joi.number().integer().positive().optional(),
  userRegistrationId: Joi.number().integer().positive().optional(),
  userLastUpdatedId: Joi.number().integer().positive().optional(),
});

export const loginSchema = Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().required(),
});

