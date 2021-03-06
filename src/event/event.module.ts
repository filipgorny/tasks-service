import { AuthModule } from './../auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { entities } from '../config/entities';
import { EventController } from './controller/event.controller';
import { EventService } from './service/event.service';

@Module({
  controllers: [EventController],
  imports: [MikroOrmModule.forFeature(entities), AuthModule],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
