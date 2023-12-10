import { ValidationOptions } from 'class-validator';

export const validationOptionsMsg = (message: string, other?: Omit<ValidationOptions, 'message'>): ValidationOptions => {
  return {
    message,
    ...other,
  };
};