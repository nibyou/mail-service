import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {}

export class CreateNewsletterContactDto {
  @ApiProperty()
  email: string;
}
