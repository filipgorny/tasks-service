import { Migration } from '@mikro-orm/migrations';

export class Migration08072201 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table `event` add uuid varchar(255)');
  }

  async down(): Promise<void> {
    this.addSql('alter table `event` drop column uuid');
  }
}
