import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  HttpExceptionBodyMessage,
  HttpExceptionBody
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // console.log('response', exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: HttpExceptionBodyMessage = 'Internal Server Error';

    if (exception instanceof QueryFailedError) {
      const errorMessage = exception.message || '';

      if (
        errorMessage.includes('duplicate key value violates unique constraint')
      ) {
        status = HttpStatus.CONFLICT;
        message = 'Conflict - Unique constraint violation';
      }
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as HttpExceptionBody;
      status = response.statusCode;
      message = response.message;
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
    });
  }
}
