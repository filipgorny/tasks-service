import { Migration } from '@mikro-orm/migrations';

export class MigrationSeed extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table seed (id int primary key auto_increment, title varchar(255))',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table seed');
  }
}
