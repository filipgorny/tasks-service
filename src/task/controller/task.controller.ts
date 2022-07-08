import { JwtAuthGuard } from './../../auth/guard/jwt.guard';
import { EventService } from './../../event/service/event.service';
import { FindTasksQuery } from './../query/find-tasks.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
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
    private readonly eventService: EventService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async find(
    @Query() findTasksQuery: FindTasksQuery,
  ): Promise<ResultTaskDto[]> {
    const tasks = await this.repository.findAll({
      offset: findTasksQuery.offset,
      limit: findTasksQuery.limit,
      orderBy: {
        id: 'DESC',
      },
    });

    return tasks.map((task) => new ResultTaskDto(task));
  }

  @Post(':uuid/done')
  @UseGuards(JwtAuthGuard)
  async done(@Param('uuid') uuid: string): Promise<ResultTaskDto> {
    const task = await this.repository.findOne({
      uuid: uuid,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!task.done) {
      await this.eventService.add(`Task ${task.uuid} marked as done`);
    }

    task.done = true;

    await this.repository.save(task);

    return new ResultTaskDto(task);
  }

  @Post(':uuid/undone')
  @UseGuards(JwtAuthGuard)
  async undone(@Param('uuid') uuid: string): Promise<ResultTaskDto> {
    const task = await this.repository.findOne({
      uuid: uuid,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!task.done) {
      await this.eventService.add(`Task ${task.uuid} marked as undone`);
    }

    task.done = false;

    await this.repository.save(task);

    return new ResultTaskDto(task);
  }
}
