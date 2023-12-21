import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { JwtGuard } from '../security/guards/jwt.guard';

interface EndpointOptions extends Partial<OperationObject> {
  isBearer?: boolean; 
}

export function ApiEndpoint (options: EndpointOptions) {
  const decorators = [];

  if (options?.isBearer) {
    options.description = options.description 
      ? options.description + '\n**!Brearer auth required**' 
      : '**!Brearer auth required**';
   
    decorators.push(
      UseGuards(JwtGuard),
      ApiBearerAuth(),
    );
  }

  decorators.push(ApiOperation(options));

  return applyDecorators(...decorators);
}
