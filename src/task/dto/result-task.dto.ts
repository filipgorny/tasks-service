import { Task } from './../entity/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResultTaskDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  done: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  constructor(task?: Task) {
    if (task) {
      this.uuid = task.uuid;
      this.label = task.label;
      this.done = task.done;
      this.createdAt = task.createdAt;
    }
  }
}
