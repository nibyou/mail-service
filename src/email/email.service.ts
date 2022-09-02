import { Injectable } from '@nestjs/common';
import { addContact, Contact, Email, sendEmail } from './helper/sib.helper';

@Injectable()
export class EmailService {
  async create(createEmailDto: Email) {
    return sendEmail(createEmailDto);
  }

  async addContact(createContactDto: Contact) {
    return addContact(createContactDto);
  }
}
