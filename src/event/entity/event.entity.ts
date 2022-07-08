import { EventRepository } from './../repository/event.respository';
import { PrimaryKey, Property, Entity } from '@mikro-orm/core';

@Entity({ customRepository: () => EventRepository })
export class Event {
  @PrimaryKey()
  id: number;

  @Property()
  uuid: string;

  @Property()
  label: string;

  @Property()
  createdAt: Date;
}
