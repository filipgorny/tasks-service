import { Migration } from '@mikro-orm/migrations';

export class Migration08072200 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table task add uuid varchar(255)');
  }

  async down(): Promise<void> {
    this.addSql('alter table task drop column uuid');
  }
}
