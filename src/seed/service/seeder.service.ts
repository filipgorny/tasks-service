import { MikroORM } from '@mikro-orm/core';
import { UseRequestContext } from '@mikro-orm/core';
import { Seed } from './../entity/seed.entity';
import { SeedRecipe } from '../recipe/seed-recipe';
import { SeedRegistry } from '../registry/seed.registry';
import { OnModuleInit } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';

export class SeederService implements OnModuleInit {
  constructor(
    private em: EntityManager,
    private readonly registry: SeedRegistry,
  ) {}

  private successWithDb = false;

  private recipesReady = [];

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const em = this.em.fork();

    this.registry.recipes.sort((r1, r2) => {
      return r2.priority - r1.priority;
    });

    for (const recipe of this.registry.recipes) {
      try {
        const exisiingSeed = await em.findOne(Seed, {
          title: recipe.title,
        });

        if (exisiingSeed) {
          this.successWithDb = true;

          continue;
        }

        this.recipesReady.push(recipe);
      } catch (e) {
        console.log('Unable to use database for seed.');
      }
    }
  }

  async commit() {
    await this.recipesReady.forEach((recipe) => this.runRecipe(recipe));
  }

  async runRecipe(recipe: SeedRecipe) {
    const emFork = this.em.fork();

    recipe.setEm(emFork);

    await recipe.run();

    const seed = new Seed();
    seed.title = recipe.title;

    emFork.persist(seed);

    recipe.setEm(emFork);

    emFork.flush();
  }
}
