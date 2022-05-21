import { Injectable } from '@nestjs/common';
import { CreateSmailDto } from './dto/create-smail.dto';
import { UpdateSmailDto } from './dto/update-smail.dto';

@Injectable()
export class SmailService {
  create(createSmailDto: CreateSmailDto) {
    return 'This action adds a new smail';
  }

  findAll() {
    return `This action returns all smail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smail`;
  }

  update(id: number, updateSmailDto: UpdateSmailDto) {
    return `This action updates a #${id} smail`;
  }

  remove(id: number) {
    return `This action removes a #${id} smail`;
  }
}
