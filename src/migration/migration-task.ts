import { Migration } from '@mikro-orm/migrations';

export class MigrationTask extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table task (id int primary key auto_increment, label varchar(1000), done int(1), created_at datetime)',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table task');
  }
}
