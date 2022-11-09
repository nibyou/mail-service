import { Injectable } from '@nestjs/common';
import { CreateTeamsNotificationDto } from './dto/create-notification.dto';
import { AdaptiveCards } from '@microsoft/adaptivecards-tools';
import { WebhookTarget } from './helper/ms-webhook.helper';
import * as template from './helper/notification_default.json';
import { JsonResponse } from '@nibyou/types';

@Injectable()
export class NotificationService {
  async createTeamsNotification(dto: CreateTeamsNotificationDto) {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
    const webhookTarget = new WebhookTarget(new URL(webhookUrl));

    const result = await webhookTarget.sendAdaptiveCard(
      AdaptiveCards.declare(template).render({
        title: dto.title,
        appName: dto.appName,
        description: dto.body,
        notificationUrl: dto.notificationUrl,
      }),
    );

    console.log(result.data);

    return new JsonResponse().setMessage('Notification has been created').setData(result.data);
  }
}
