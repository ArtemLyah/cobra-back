import { Request } from 'express';

export interface RequestUserData<Data=any> extends Request {
  user: Data, 
}