import { Migration } from '@mikro-orm/migrations';

export class MigrationEvent extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table event (id int primary key auto_increment, label varchar(1000), created_at datetime)',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table event');
  }
}
