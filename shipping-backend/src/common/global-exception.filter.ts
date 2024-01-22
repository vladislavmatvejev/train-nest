import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof QueryFailedError) {
      const errorMessage = exception.message || '';

      if (
        errorMessage.includes('duplicate key value violates unique constraint')
      ) {
        status = HttpStatus.CONFLICT;
        message = 'Conflict - Unique constraint violation';
      }
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
    });
  }
}
