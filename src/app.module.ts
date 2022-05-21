import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from '@nibyou/keycloak';
import { EmailModule } from './email/email.module';
import { SmailModule } from './smail/smail.module';

@Module({
  imports: [KeycloakModule, EmailModule, SmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
