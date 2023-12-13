import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUserEmailException extends HttpException {
  constructor () {
    super('User with such email already exists', HttpStatus.BAD_REQUEST);
  }
}