import { EventRepository } from './../repository/event.respository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Event } from '../entity/event.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: EventRepository,
  ) {}

  async add(label: string): Promise<Event> {
    const event = new Event();
    event.uuid = randomUUID();
    event.label = label;
    event.createdAt = new Date();

    await this.eventRepository.save(event);

    return event;
  }
}
