import { PartialType } from '@nestjs/mapped-types';
import { CreateSmailDto } from './create-smail.dto';

export class UpdateSmailDto extends PartialType(CreateSmailDto) {}
