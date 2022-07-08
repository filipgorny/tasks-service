import { Migration } from '@mikro-orm/migrations';

export class MigrationUser extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table user (id int primary key auto_increment, email varchar(255), password varchar(255))',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table user');
  }
}
