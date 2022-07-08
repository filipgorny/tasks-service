import { InjectRepository } from '@mikro-orm/nestjs';
import { Controller, Get, Query } from '@nestjs/common';
import { ResultEventDto } from '../dto/result-event.dto';
import { Event } from './../entity/event.entity';
import { FindEventsQuery } from './../query/find-events.query';
import { EventRepository } from './../repository/event.respository';

@Controller('event')
export class EventController {
  constructor(
    @InjectRepository(Event) private readonly repository: EventRepository,
  ) {}

  @Get()
  async find(
    @Query() findEventsQuery: FindEventsQuery,
  ): Promise<ResultEventDto[]> {
    const events = await this.repository.findAll({
      offset: findEventsQuery.offset,
      limit: findEventsQuery.limit,
      orderBy: {
        id: 'DESC',
      },
    });

    return events.map((event) => new ResultEventDto(event));
  }
}
