import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import logger from '../logger/winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, query, params } = request;
    
    // Correção: usar request.headers ao invés de request.get()
    const userAgent = request.headers['user-agent'] || '';
    const ip = request.ip || request.connection?.remoteAddress || '';

    const requestData = {
      method,
      url,
      body: this.sanitizeBody(body),
      query,
      params,
      userAgent,
      ip,
    };

    logger.info('Incoming Request', {
      type: 'REQUEST',
      data: requestData,
    });

    const now = Date.now();

    return next.handle().pipe(
      tap((responseData) => {
        const responseTime = Date.now() - now;
        logger.info('Successful Response', {
          type: 'RESPONSE_SUCCESS',
          statusCode: response.statusCode,
          responseTime: `${responseTime}ms`,
          data: this.sanitizeResponse(responseData),
          request: requestData,
        });
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        logger.error('Error Response', {
          type: 'RESPONSE_ERROR',
          statusCode: error.status || 500,
          responseTime: `${responseTime}ms`,
          error: {
            message: error.message,
            stack: error.stack,
          },
          request: requestData,
        });
        return throwError(() => error);
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sanitized = { ...body };
    
    // Remove campos sensíveis
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });
    
    return sanitized;
  }

  private sanitizeResponse(response: any): any {
    if (!response) return response;
    
    // Limita o tamanho da resposta para logging
    const responseStr = JSON.stringify(response);
    if (responseStr.length > 1000) {
      return { 
        message: 'Response too large for logging', 
        size: responseStr.length,
        preview: responseStr.substring(0, 200) + '...'
      };
    }
    
    return response;
  }
}