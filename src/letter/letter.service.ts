import { Injectable } from '@nestjs/common';
import { CreateLetterDto, OnboardingLetterDto } from './dto/create-letter.dto';
import {
  deleteSending,
  getSending,
  getSendings,
  sendLetter,
} from './helper/binect.helper';
import { Document } from 'binect';
import handlebars from 'handlebars';
import { createWriteStream, promises as fs } from 'fs';
import latex from '@nibyou/latex';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { Transform } from 'stream';

@Injectable()
export class LetterService {
  async create(createLetterDto: CreateLetterDto) {
    await sendLetter(createLetterDto);
  }

  async createOnboardingLetter(onboardingLetterDto: OnboardingLetterDto) {
    console.log('dirname', __dirname);
    const source = await fs.readFile(
      path.join(__dirname, 'helper', 'latex', 'onboarding-template.tex'),
      'utf8',
    );

    const template = handlebars.compile(source);

    const result = template(onboardingLetterDto);

    const fileUuid = uuid();
    const uuidFile = path.join(
      __dirname,
      'helper',
      'latex',
      'generated-pdfs',
      fileUuid + '.pdf',
    );

    const pdf = latex(result, {
      inputs: [path.join(__dirname, 'helper', 'latex')],
    });

    await writeFileStream(uuidFile, pdf);

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

    //await fs.unlink(uuidFile);

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

function writeFileStream(fileName: string, content: Transform) {
  return new Promise<void>((resolve, reject) => {
    const str = createWriteStream(fileName);
    content.pipe(str);
    content.on('error', (err) => {
      reject(err);
    });
    content.on('finish', () => {
      resolve();
    });
  });
}
