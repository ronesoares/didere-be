import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(private schema: ObjectSchema) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { error } = this.schema.validate(request.body);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return next.handle();
  }
}

