import * as Joi from 'joi';

export const createClaimFormSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  phoneNumber: Joi.string().pattern(/^\d{10,12}$/).required(),
  email: Joi.string().email().max(50).required(),
  messageDetail: Joi.string().max(1000).required(),
  source: Joi.string().valid('WEBSITE', 'MOBILE', 'PHONE', 'EMAIL').default('WEBSITE'),
  propertyId: Joi.number().integer().positive().optional(),
});

export const updateClaimFormSchema = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  phoneNumber: Joi.string().pattern(/^\d{10,12}$/).optional(),
  email: Joi.string().email().max(50).optional(),
  messageDetail: Joi.string().max(1000).optional(),
  source: Joi.string().valid('WEBSITE', 'MOBILE', 'PHONE', 'EMAIL').optional(),
  propertyId: Joi.number().integer().positive().optional(),
});

