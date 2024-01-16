import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { Response } from 'express';
import { InvalidBodyException } from './exceptions/InvalidBodyException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor () {}

  async catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const errorName = exception.constructor.name;
    let status;
    let message;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      if (typeof errorResponse === 'object') {
        const { statusCode, ...errorMessage } = errorResponse as any;
        status = statusCode;
        message = errorMessage;
      } 
      else {
        message = {
          message: errorResponse,
        };
      }

      status = status ?? exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    }
    else {
      console.error(exception.stack);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = {
        message: 'An error occured on the server side',
      };
    }

    res.status(status as number).json({
      error: errorName,
      type: exception.constructor.name,
      status,
      ...message,
    });
  }
}

const flattenValidationErrors = (errors: ValidationError[], parent = 'obj'): string[] => {
  const results = [];

  for (const { property, constraints, children } of errors) {
    if (constraints) {
      results.push(...Object.values(constraints).map((c) => `${parent}.${property}: ${c}`));
    }
    if (children.length !== 0) {
      results.push(...flattenValidationErrors(children, `${parent}.${property}`));
    }
  }

  return results;
};

export const validationExceptionFactory = (errors: ValidationError[]) => {
  return new InvalidBodyException(flattenValidationErrors(errors));
};