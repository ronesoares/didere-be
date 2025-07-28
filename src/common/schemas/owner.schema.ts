import * as Joi from 'joi';

export const createOwnerSchema = Joi.object({
  name: Joi.string().max(60).required(),
  nickname: Joi.string().max(30).optional(),
  phoneOption1: Joi.string().max(12).optional(),
  phoneOption2: Joi.string().max(12).optional(),
  email: Joi.string().email().max(50).required(),
  document: Joi.string().max(15).optional(),
  birthday: Joi.date().optional(),
  tokenSeller: Joi.string().max(6).optional(),
  idAddress: Joi.number().integer().positive().optional(),
  idSystem: Joi.number().integer().positive().required(),
});

export const updateOwnerSchema = Joi.object({
  name: Joi.string().max(60).optional(),
  nickname: Joi.string().max(30).optional(),
  phoneOption1: Joi.string().max(12).optional(),
  phoneOption2: Joi.string().max(12).optional(),
  email: Joi.string().email().max(50).optional(),
  document: Joi.string().max(15).optional(),
  birthday: Joi.date().optional(),
  tokenSeller: Joi.string().max(6).optional(),
  idAddress: Joi.number().integer().positive().optional(),
  idSystem: Joi.number().integer().positive().optional(),
});

