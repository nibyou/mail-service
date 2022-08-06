import 'dotenv/config';
import {
  Configuration,
  SendingsApi,
  SendDocumentRequest,
  Document,
} from 'binect';
import {
  DocumentDocumentTypeEnum,
  Letter,
  SerialLetter,
  Status,
} from 'binect/dist/api/api';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const configuration = new Configuration({
  username: process.env.BIN_API_USER,
  password: process.env.BIN_API_PASS,
});

const sendingApi = new SendingsApi(configuration);

export const sendLetter = async (
  letter: SendDocumentRequest,
): Promise<Document> => {
  console.log('letter', letter);
  const result = await sendingApi.sendDocument(letter);
  console.log(result, result.data);
  return result.data;
};

export const getSendings = async (): Promise<Document[]> => {
  const result = await sendingApi.getAllSendings();
  return result.data;
};

export const getSending = async (id: number): Promise<Document> => {
  const result = await sendingApi.getSendingForDocument(id);
  return result.data;
};

export const deleteSending = async (id: number): Promise<void> => {
  await sendingApi.deleteSendingForDocument(id);
};

export class BinectDocument implements Document {
  @ApiProperty()
  id: number;
  @ApiProperty()
  filename: string;
  @ApiPropertyOptional()
  numberOfPages?: number;
  @ApiProperty()
  status: Status;
  @ApiProperty()
  documentType: DocumentDocumentTypeEnum;
  @ApiPropertyOptional()
  letter?: Letter;
  @ApiPropertyOptional()
  serialLetter?: SerialLetter;
}
