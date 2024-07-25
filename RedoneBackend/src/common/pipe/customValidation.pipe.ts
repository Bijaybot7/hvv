import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(value);
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException({ errors: formattedErrors });
    }
    return value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    errors.forEach((error) => {
      const property = error.property;

      if (!formattedErrors[property]) {
        formattedErrors[property] = [];
      }

      Object.keys(error.constraints).forEach((constraintKey) => {
        formattedErrors[property].push(error.constraints[constraintKey]);
      });
    });

    return formattedErrors;
  }
}
