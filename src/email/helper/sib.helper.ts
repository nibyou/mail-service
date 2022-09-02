import 'dotenv/config';
import axios, { AxiosResponse } from 'axios';
import { ApiProperty } from '@nestjs/swagger';

const SIBApi = axios.create({
  baseURL: 'https://api.sendinblue.com/v3',
  timeout: 1000,
  headers: {
    accept: 'application/json',
    'api-key': process.env.SIB_API_KEY,
    'content-type': 'application/json',
  },
});

class Recipient {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}

export class Email {
  @ApiProperty({
    type: [Recipient],
  })
  to: Array<Recipient>;
  @ApiProperty()
  templateId: number;
  @ApiProperty()
  params: Record<string, string>;
}

export class EmailResponse {
  @ApiProperty()
  messageId: string;
}

export const sendEmail = async (email: Email): Promise<EmailResponse> => {
  const response = await SIBApi.post<any, AxiosResponse<EmailResponse>>(
    '/smtp/email',
    email,
  );
  return response.data;
};

export class Contact {
  @ApiProperty()
  email: string;
  @ApiProperty({
    type: [Number],
  })
  listIds: number[];
}

export class ContactResponse {
  @ApiProperty()
  id: string;
}

export const addContact = async (
  contact: Contact,
): Promise<ContactResponse> => {
  const response = await SIBApi.post<any, AxiosResponse<ContactResponse>>(
    '/contacts',
    contact,
  );

  return response.data;
};
