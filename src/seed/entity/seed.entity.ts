import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Seed {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;
}
