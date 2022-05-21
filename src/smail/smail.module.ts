import { Module } from '@nestjs/common';
import { SmailService } from './smail.service';
import { SmailController } from './smail.controller';

@Module({
  controllers: [SmailController],
  providers: [SmailService],
})
export class SmailModule {}
