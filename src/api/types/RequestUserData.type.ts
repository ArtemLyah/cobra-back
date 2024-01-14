import { Request } from 'express';
import { TokenPayload } from './TokenPayload.type';

export interface RequestUserData extends Request {
  user: TokenPayload, 
}