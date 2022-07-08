import { Injectable, OnModuleInit } from '@nestjs/common';
import { Migrator } from './migration/migrator';
import { SeederService } from './seed/service/seeder.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private migrator: Migrator,
    private seederService: SeederService,
  ) {}

  async onModuleInit() {
    await this.migrator.up();
    await this.seederService.commit();
  }
}
