import { Migration } from '@mikro-orm/migrations';

export class Migration10072200 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table task add number varchar(20)');
  }

  async down(): Promise<void> {
    this.addSql('alter table task drop column number');
  }
}
