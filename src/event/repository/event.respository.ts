import { EntityRepository } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Event } from '../entity/event.entity';

@Injectable()
export class EventRepository extends EntityRepository<Event> {
  async save(event: Event) {
    this.persist(event);
    await this.flush();
  }
}
