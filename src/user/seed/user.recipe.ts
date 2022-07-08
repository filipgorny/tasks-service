import { User } from '../entity/user.entity';
import { SeedRecipe } from '../../seed/recipe/seed-recipe';
import { Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '../../security/service/password.service';
import { LazyModuleLoader } from '@nestjs/core';
import { LazyModule } from 'src/lazy/lazy.module';
import { SecurityModule } from 'src/security/security.module';

@Injectable()
export class UserRecipe extends SeedRecipe {
  title = 'admin user entities';

  constructor(private lazyModuleLoader: LazyModuleLoader) {
    super();
  }

  public async run(): Promise<void> {
    console.log(this.lazyModuleLoader);

    const securityService = await this.lazyModuleLoader.load(
      () => SecurityModule,
    );
    const passwordService = securityService.get(PasswordService);

    const admin = new User();
    admin.email = 'admin@example.com';
    admin.password = await passwordService.encode('admin');

    this.em.persist(admin);
    this.em.flush();

    this.addReference('admin', admin);
  }

  priority = 2;
}
