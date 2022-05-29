import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LetterService } from './letter.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { RealmRoles } from '@nibyou/types';
import { BinectDocument } from './helper/binect.helper';

@ApiTags(`letter`)
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Binect has successfully sent the letter',
    status: 201,
    type: BinectDocument,
  })
  @HttpCode(201)
  @Roles({ roles: [RealmRoles.ADMIN, RealmRoles.BACKEND_SERVICE] })
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.letterService.create(createLetterDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all letters from Binect',
    status: 200,
    type: [BinectDocument],
  })
  @HttpCode(200)
  @ApiNotFoundResponse({ description: 'Letter not found' })
  @Roles({ roles: [RealmRoles.ADMIN] })
  findAll() {
    return this.letterService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Letter information from Binect',
    status: 200,
    type: BinectDocument,
  })
  @HttpCode(200)
  @ApiNotFoundResponse({ description: 'Letter not found' })
  @Roles({ roles: [RealmRoles.ADMIN] })
  findOne(@Param('id') id: string) {
    return this.letterService.findOne(+id);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The letter was removed from Binect',
  })
  @ApiNotFoundResponse({ description: 'Letter not found' })
  @Roles({ roles: [RealmRoles.ADMIN] })
  remove(@Param('id') id: string) {
    return this.letterService.remove(+id);
  }
}
