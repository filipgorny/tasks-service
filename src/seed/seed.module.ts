import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { DynamicModule } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { LazyModule } from '../lazy/lazy.module';
import { SecurityModule } from '../security/security.module';
import { SeedRecipe } from './recipe/seed-recipe';
import { SeedRegistry } from './registry/seed.registry';
import { SeederService } from './service/seeder.service';

export type Seed = { new (...args: any[]): any };

export class SeedModule {
  static dynamic(...seedRecipes: Seed[]): DynamicModule {
    const registry = new SeedRegistry();
    const seedNames = [];

    return {
      module: SeedModule,
      imports: [SecurityModule, LazyModule],
      providers: [
        ...seedRecipes.map((seed: Seed) => {
          const seedName =
            seed.constructor.name.toString() + Math.random() * 1000;

          seedNames.push(seedName);

          return {
            provide: seedName,
            useClass: seed,
          };
        }),
        {
          provide: SeedRegistry,
          useFactory: (...recipes) => {
            registry.addRecipe(...recipes);

            return registry;
          },
          inject: [...seedNames],
        },
        {
          provide: SeederService,
          useFactory: (em, registry) => {
            return new SeederService(em, registry);
          },
          inject: [EntityManager, SeedRegistry],
        },
      ],
      exports: [SeederService],
    };
  }

  static forRoot = this.dynamic;

  static forFeature = this.dynamic;
}
