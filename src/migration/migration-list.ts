import { MigrationTask } from './migration-task';
import { MigrationObject, MigrationsOptions } from '@mikro-orm/core';
import { MigrationSeed } from './migration-seed';
import { MigrationUser } from './migration-user';

const migrations = [MigrationUser, MigrationSeed, MigrationTask];

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
