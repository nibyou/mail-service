import 'dotenv/config';
import axios from 'axios';

const SIBApi = axios.create({
  baseURL: 'https://api.sendinblue.com/v3',
  timeout: 1000,
  headers: {
    accept: 'application/json',
    'api-key': process.env.SIB_API_KEY,
    'content-type': 'application/json',
  },
});

export class Email {
  sender: { name: string; email: string };
  to: [{ name: string; email: string }];
  templateId: number;
  params: Record<string, string>;
}

export const sendEmail = async (email: Email) => {
  return await SIBApi.post('/smtp/email', email);
};
