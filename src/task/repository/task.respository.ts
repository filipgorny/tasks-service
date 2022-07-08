import { EntityRepository } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskRepository extends EntityRepository<Task> {
  async save(task: Task) {
    this.persist(task);
    await this.flush();
  }
}
