import { Migration08072201 } from './migration-08072201';
import { MigrationEvent } from './migration-event';
import { Migration08072200 } from './migration-08072200';
import { MigrationTask } from './migration-task';
import { MigrationObject, MigrationsOptions } from '@mikro-orm/core';
import { MigrationSeed } from './migration-seed';
import { MigrationUser } from './migration-user';

const migrations = [
  MigrationUser,
  MigrationSeed,
  MigrationTask,
  MigrationEvent,
  Migration08072200,
  Migration08072201,
];

export const migrationsList: MigrationObject[] = migrations.map((migration) => {
  return {
    name: migration.name,
    class: migration,
  };
});

export const migrationsOptions: MigrationsOptions = {
  migrationsList,
  allOrNothing: true,
};
