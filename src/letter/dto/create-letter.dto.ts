import { ApiProperty } from '@nestjs/swagger';

class Content {
  @ApiProperty()
  readonly filename: string;
  @ApiProperty()
  readonly content: string;
}

class Options {
  @ApiProperty()
  readonly simplex: boolean;
  @ApiProperty()
  readonly color: boolean;
}

export class CreateLetterDto {
  @ApiProperty()
  readonly content: Content;
  @ApiProperty()
  readonly options: Options;
}
