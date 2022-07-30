import { Injectable } from '@nestjs/common';
import { CreateLetterDto, OnboardingLetterDto } from './dto/create-letter.dto';
import {
  deleteSending,
  getSending,
  getSendings,
  sendLetter,
} from './helper/binect.helper';
import { Document } from 'binect';
import handlebard from 'handlebars';
import { promises as fs } from 'fs';
import latex from 'node-latex';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LetterService {
  async create(createLetterDto: CreateLetterDto) {
    await sendLetter(createLetterDto);
  }

  async createOnboardingLetter(onboardingLetterDto: OnboardingLetterDto) {
    const source = await fs.readFile(
      './helper/latex/onboarding-template.tex',
      'utf8',
    );

    const template = handlebard.compile(source);

    const result = template(onboardingLetterDto);

    const fileUuid = uuid();
    const uuidFile = `./helper/latex/generated-pdfs/${fileUuid}.tex`;

    const pdf = latex(result, {
      inputs: ['./latex'],
    });

    await fs.writeFile(uuidFile, pdf);

    const pdfString = await fs.readFile(uuidFile, 'utf8');

    const createLetterDto: CreateLetterDto = {
      content: {
        filename: `${fileUuid}.pdf`,
        content: pdfString,
      },
      options: {
        simplex: true,
        color: true,
      },
    };

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
