import { TaskRepository } from './../repository/task.respository';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ customRepository: () => TaskRepository })
export class Task {
  @PrimaryKey()
  id: number;

  @Property()
  label: string;

  @Property()
  done = false;

  @Property()
  createdAt: Date;
}
