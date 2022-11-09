import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Notification {
  @ApiProperty()
  body: string;
}

export class TeamsNotification extends Notification {
  @ApiProperty()
  title: string;

  @ApiProperty()
  appName: string;

  @ApiPropertyOptional()
  notificationUrl?: string;
}
