import { UseInterceptors } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ValidationInterceptor } from '../interceptors/validation.interceptor';

export const JoiValidation = (schema: ObjectSchema) =>
  UseInterceptors(new ValidationInterceptor(schema));

