import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EmailService } from './email.service';
import { Roles } from 'nest-keycloak-connect';
import { RealmRoles } from '@nibyou/types';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Email, EmailResponse } from './helper/sib.helper';

@ApiTags(`email`)
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Sendinblue has successfully sent the email',
    status: 201,
    type: EmailResponse,
  })
  @HttpCode(201)
  @Roles({ roles: [RealmRoles.ADMIN, RealmRoles.BACKEND_SERVICE] })
  create(@Body() createEmailDto: Email) {
    return this.emailService.create(createEmailDto);
  }
}
