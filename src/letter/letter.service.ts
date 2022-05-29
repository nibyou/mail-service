import { Injectable } from '@nestjs/common';
import { CreateLetterDto } from './dto/create-letter.dto';
import {
  deleteSending,
  getSending,
  getSendings,
  sendLetter,
} from './helper/binect.helper';
import { Document } from 'binect';

@Injectable()
export class LetterService {
  async create(createLetterDto: CreateLetterDto) {
    await sendLetter(createLetterDto);
  }

  async findAll(): Promise<Document[]> {
    return getSendings();
  }

  async findOne(id: number): Promise<Document> {
    return getSending(id);
  }

  async remove(id: number): Promise<void> {
    await deleteSending(id);
  }
}
