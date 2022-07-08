import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Migrator {
  constructor(private mikroORM: MikroORM) {}

  async up() {
    await this.mikroORM.getMigrator().up();
  }

  async down() {
    await this.mikroORM.getMigrator().down();
  }
}
