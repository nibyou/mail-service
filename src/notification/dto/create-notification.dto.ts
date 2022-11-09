import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {}

export class CreateTeamsNotificationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  appName: string;

  @ApiProperty()
  body: string;

  @ApiPropertyOptional()
  notificationUrl?: string;
}
