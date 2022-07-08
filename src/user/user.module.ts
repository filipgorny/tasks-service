import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { entities } from '../config/entities';
import { SeedModule } from '../seed/seed.module';
import { UserRecipe } from './seed/user.recipe';
import { SecurityModule } from '../security/security.module';
import { LazyModule } from 'src/lazy/lazy.module';
import { LazyModuleLoader } from '@nestjs/core';

@Module({
  imports: [
    SecurityModule,
    MikroOrmModule.forFeature(entities),
    ConfigModule.forRoot({ load: [config] }),
    SeedModule.forFeature(UserRecipe),
  ],
  providers: [],
})
export class UserModule {}
