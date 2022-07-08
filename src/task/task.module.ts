import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { entities } from './../config/entities';
import { TaskController } from './controller/task.controller';

@Module({
  controllers: [TaskController],
  imports: [MikroOrmModule.forFeature(entities)],
})
export class TaskModule {}
