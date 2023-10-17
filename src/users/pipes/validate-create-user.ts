/* eslint-disable prettier/prettier */
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const parsedValue = parseInt(value.age.toString());

    if (isNaN(parsedValue)) {
      throw new HttpException(
        'Experience is expected in Number..',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value, age: parsedValue };
  }
}
