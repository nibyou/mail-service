import { Injectable } from '@nestjs/common';
import { Email, sendEmail } from './helper/sib.helper';

@Injectable()
export class EmailService {
  async create(createEmailDto: Email) {
    return sendEmail(createEmailDto);
  }
}
