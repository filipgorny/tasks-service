import { SeedRecipe } from '../recipe/seed-recipe';
import { Reference } from './reference';

export class SeedRegistry {
  private recipesList: SeedRecipe[] = [];

  private references: Reference[] = [];

  addRecipe(...recipes: SeedRecipe[]) {
    recipes.forEach((recipe) => {
      recipe.onReferenceAdd = (reference: Reference) => {
        this.references.push(reference);
      };

      recipe.onReferenceGet = (name: string) => {
        for (const reference of this.references) {
          if (reference.name == name) {
            return reference.instance;
          }
        }

        throw new Error(`Reference not found: ${name}`);
      };
    });

    this.recipesList.push(...recipes);
  }

  get recipes(): SeedRecipe[] {
    return this.recipesList;
  }
}
