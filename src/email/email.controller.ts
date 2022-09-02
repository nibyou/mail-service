import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public, Roles } from 'nest-keycloak-connect';
import { RealmRoles } from '@nibyou/types';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  Contact,
  ContactResponse,
  Email,
  EmailResponse,
} from './helper/sib.helper';
import { CreateNewsletterContactDto } from './dto/create-email.dto';

@ApiTags(`email`)
@ApiBearerAuth()
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

  @Post('contact')
  @ApiCreatedResponse({
    description: 'Sendinblue has successfully added the contact',
    type: ContactResponse,
  })
  @Roles({ roles: [RealmRoles.ADMIN, RealmRoles.BACKEND_SERVICE] })
  addContact(@Body() createContactDto: Contact) {
    return this.emailService.addContact(createContactDto);
  }

  @Post('contact/newsletter')
  @ApiCreatedResponse({
    description:
      'Sendinblue has successfully added the contact to the Nibyou Newsletter',
    type: ContactResponse,
  })
  @Public()
  addNewsletterContact(
    @Body() createNewsletterContactDto: CreateNewsletterContactDto,
  ) {
    const contact = new Contact();
    contact.email = createNewsletterContactDto.email;
    contact.listIds = [+process.env.NEWSLETTER_ID];
    return this.emailService.addContact(contact);
  }
}
