import * as Joi from 'joi';

export const createPropertySchema = Joi.object({
  locatorId: Joi.number().integer().positive().required(),
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(4000).optional(),
  addressId: Joi.number().integer().positive().required(),
  height: Joi.number().positive().required(),
  width: Joi.number().positive().required(),
  depth: Joi.number().positive().required(),
  mainPhoto: Joi.string().optional(),
  periodicity: Joi.string().valid('D', 'W', 'M', 'Y').default('M'),
  value: Joi.number().positive().required(),
  urlMaps: Joi.string().uri().max(2000).optional(),
});

export const updatePropertySchema = Joi.object({
  locatorId: Joi.number().integer().positive().optional(),
  title: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(4000).optional(),
  addressId: Joi.number().integer().positive().optional(),
  height: Joi.number().positive().optional(),
  width: Joi.number().positive().optional(),
  depth: Joi.number().positive().optional(),
  mainPhoto: Joi.string().optional(),
  periodicity: Joi.string().valid('D', 'W', 'M', 'Y').optional(),
  value: Joi.number().positive().optional(),
  urlMaps: Joi.string().uri().max(2000).optional(),
});

export const createPropertyRentalPeriodSchema = Joi.object({
  propertyId: Joi.number().integer().positive().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  startHour: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).default('00:00'),
  endHour: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).default('23:59'),
  sunday: Joi.string().valid('Y', 'N').default('Y'),
  monday: Joi.string().valid('Y', 'N').default('Y'),
  tuesday: Joi.string().valid('Y', 'N').default('Y'),
  wednesday: Joi.string().valid('Y', 'N').default('Y'),
  thursday: Joi.string().valid('Y', 'N').default('Y'),
  friday: Joi.string().valid('Y', 'N').default('Y'),
  saturday: Joi.string().valid('Y', 'N').default('Y'),
});

export const createPropertyFeatureSchema = Joi.object({
  propertyId: Joi.number().integer().positive().required(),
  featureId: Joi.number().integer().positive().required(),
});

export const createPropertyTypeActivitySchema = Joi.object({
  propertyId: Joi.number().integer().positive().required(),
  typeActivityId: Joi.number().integer().positive().required(),
});

