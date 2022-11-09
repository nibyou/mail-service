import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateTeamsNotificationDto } from './dto/create-notification.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JsonResponse, RealmRoles } from '@nibyou/types';
import { Roles } from 'nest-keycloak-connect';

@ApiTags(`notification`)
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('/teams')
  @ApiCreatedResponse({
    description: 'Notification has been created',
    status: 201,
    type: JsonResponse,
  })
  @Roles({ roles: [RealmRoles.ADMIN, RealmRoles.BACKEND_SERVICE] })
  createTeamsNotification(@Body() createTeamsNotificationDto: CreateTeamsNotificationDto) {
    return this.notificationService.createTeamsNotification(
      createTeamsNotificationDto,
    );
  }
}
