import { TaskRepository } from './../repository/task.respository';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ customRepository: () => TaskRepository })
export class Task {
  @PrimaryKey()
  id: number;

  @Property()
  uuid: string;

  @Property({
    name: 'number',
  })
  numberValue: string;

  @Property()
  label: string;

  @Property()
  done = false;

  @Property()
  createdAt: Date;

  get number() {
    if (this.numberValue == undefined || this.numberValue.length == 0) {
      return `ID-${this.idFormatted}`;
    }

    return this.numberValue;
  }

  set number(value: string) {
    this.numberValue = value;
  }

  get idFormatted(): string {
    return this.id.toString().padStart(4, '0');
  }
}
