import { EntityManager } from '@mikro-orm/core';
import { Reference } from '../registry/reference';

export abstract class SeedRecipe {
  constructor(...args: any[]) {}

  public abstract run(): Promise<void>;
  protected em: EntityManager;

  public setEm(em: EntityManager) {
    this.em = em;
  }

  onReferenceAdd: (reference: Reference) => void = () => null;
  onReferenceGet: (name: string) => any = () => null;

  addReference(name: string, instance: any) {
    const reference = new Reference(name, instance);

    this.onReferenceAdd(reference);
  }

  getReference(name: string) {
    return this.onReferenceGet(name);
  }

  public abstract title: string;

  public priority = 1;
}
