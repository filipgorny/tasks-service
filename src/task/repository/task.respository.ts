import { EntityRepository } from '@mikro-orm/knex';
import { knex } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskRepository extends EntityRepository<Task> {
  async save(task: Task) {
    const lastTask = await this.findAll({
      orderBy: {
        id: 'DESC',
      },
      limit: 1,
    });

    task.numberValue = `TASK-${lastTask[0].id}`;
    this.persist(task);
    await this.flush();
  }
}
