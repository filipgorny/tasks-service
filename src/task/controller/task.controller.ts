import { FindTasksQuery } from './../query/find-tasks.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ResultTaskDto } from '../dto/result-task.dto';
import { CreateTaskDto } from './../dto/create-task.dto';
import { Task } from './../entity/task.entity';
import { TaskRepository } from './../repository/task.respository';

@Controller('task')
export class TaskController {
  constructor(
    @InjectRepository(Task) private readonly repository: TaskRepository,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<ResultTaskDto> {
    const task = new Task();
    task.uuid = randomUUID();
    task.label = createTaskDto.label;
    task.createdAt = new Date();

    await this.repository.save(task);

    const resultTaskDto = new ResultTaskDto(task);

    return resultTaskDto;
  }

  @Get()
  async find(
    @Query() findTasksQuery: FindTasksQuery,
  ): Promise<ResultTaskDto[]> {
    const tasks = await this.repository.findAll({
      offset: findTasksQuery.offset,
      limit: findTasksQuery.limit,
    });

    return tasks.map((task) => new ResultTaskDto(task));
  }

  @Post(':uuid/done')
  async done(@Param('uuid') uuid: string): Promise<ResultTaskDto> {
    const task = await this.repository.findOne({
      uuid: uuid,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.done = true;

    await this.repository.save(task);

    return new ResultTaskDto(task);
  }

  @Post(':uuid/undone')
  async undone(@Param('uuid') uuid: string): Promise<ResultTaskDto> {
    const task = await this.repository.findOne({
      uuid: uuid,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.done = false;

    await this.repository.save(task);

    return new ResultTaskDto(task);
  }
}
