import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyRegisteredException extends HttpException {
  constructor () {
    super('User with such email already registered', HttpStatus.CONFLICT);
  }
}