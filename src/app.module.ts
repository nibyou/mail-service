import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from '@nibyou/keycloak';
import { EmailModule } from './email/email.module';
import { LetterModule } from './letter/letter.module';

@Module({
  imports: [KeycloakModule, EmailModule, LetterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
