import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SmailService } from './smail.service';
import { CreateSmailDto } from './dto/create-smail.dto';
import { UpdateSmailDto } from './dto/update-smail.dto';

@Controller('smail')
export class SmailController {
  constructor(private readonly smailService: SmailService) {}

  @Post()
  create(@Body() createSmailDto: CreateSmailDto) {
    return this.smailService.create(createSmailDto);
  }

  @Get()
  findAll() {
    return this.smailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmailDto: UpdateSmailDto) {
    return this.smailService.update(+id, updateSmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smailService.remove(+id);
  }
}
