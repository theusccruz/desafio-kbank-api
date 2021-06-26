import ApiError from '@shared/errors/ApiError';
import IVerifyStringDTO from './dtos/IVerifyStringDTO';
import IVerifyStringRefDTO from './dtos/IVerifyStringRefDTO';

export default class Validate {
  public required(field: string, fieldName: string): void {
    const validation = field === null || field === undefined;

    if (validation) {
      throw new ApiError(`Field ${fieldName} is required`);
    }
  }

  public email(email: string): void {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validation = regex.test(email);

    if (!validation) {
      throw new ApiError(`Invalid email`);
    }
  }

  public string({ length, isOnlyString, field, fieldName }: IVerifyStringDTO): void {
    if (field) {
      const validateSpaces = field.trim();
      if (validateSpaces === '') {
        throw new ApiError(`Field ${fieldName} is empty`);
      }

      // /[A-Z][a-z]*/;

      if (isOnlyString) {
        const regex = /^[a-z ,.'-]+$/i;
        const validateString = regex.test(field);

        if (!validateString) {
          throw new ApiError(`Field ${fieldName} accepts strings only`);
        }
      }

      if (length) {
        const validation = field.length >= length;
        if (!validation) {
          throw new ApiError(`Field ${fieldName} must be at least ${length} characters`);
        }
      }
    }
  }

  public stringRef({
    field,
    fieldName,
    isOnlyString,
    length,
    same,
    refFieldName,
    ref,
  }: IVerifyStringRefDTO): void {
    if (ref) {
      if (!field) {
        throw new ApiError(`Field ${fieldName} is references field ${refFieldName}`);
      }

      const validateSpaces = field.trim();
      if (validateSpaces === '') {
        throw new ApiError(`Field ${fieldName} is empty`);
      }

      // /[A-Z][a-z]*/;

      if (isOnlyString) {
        const regex = /^[a-z ,.'-]+$/i;
        const validateString = regex.test(field);

        if (!validateString) {
          throw new ApiError(`Field ${fieldName} accepts strings only`);
        }
      }

      if (length) {
        const validation = field.length >= length;
        if (!validation) {
          throw new ApiError(`Field ${fieldName} must be at least ${length} characters`);
        }
      }

      if (same) {
        const fieldsVerification = field === same;
        if (!fieldsVerification) {
          throw new ApiError(`Field ${fieldName} not same field ${refFieldName}`);
        }
      }
    }
  }

  public boolean(field: boolean, fieldName: string): void {
    const validation = field === true || field === false;

    if (!validation) {
      throw new ApiError(`Field ${fieldName} accepts true/false only`);
    }
  }
}
