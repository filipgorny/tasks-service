import { MigrationObject, MigrationsOptions } from '@mikro-orm/core';
import { Migration08072200 } from './migration-08072200';
import { Migration08072201 } from './migration-08072201';
import { Migration10072200 } from './migration-10072200';
import { MigrationEvent } from './migration-event';
import { MigrationSeed } from './migration-seed';
import { MigrationTask } from './migration-task';

const migrations = [
  MigrationSeed,
  MigrationTask,
  MigrationEvent,
  Migration08072200,
  Migration08072201,
  Migration10072200,
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
