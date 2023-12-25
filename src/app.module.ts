import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigModule } from './config/typeorm-config/typeorm-config.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [TypeormConfigModule, ConfigModule.forRoot(), ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
