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

class Sender {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}

export class Email {
  @ApiProperty()
  sender: Sender;
  @ApiProperty({
    type: [Sender],
  })
  to: Array<Sender>;
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
