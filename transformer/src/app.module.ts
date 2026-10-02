import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ElasticService } from './elastic/elastic.service.js';
import { TicketsController } from './tickets/tickets.controller.js';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
  ],
  controllers: [TicketsController],
  providers: [ElasticService],
})
export class AppModule {}
