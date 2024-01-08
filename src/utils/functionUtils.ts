import * as bcrypt from 'bcrypt';

export const hashString = (data: string) => {
  return bcrypt.hash(data, 10);
};

export const matchHash = (data: string, hash: string) => {
  return bcrypt.compare(data, hash);
};