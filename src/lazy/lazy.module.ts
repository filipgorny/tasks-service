import { Module } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { SecurityModule } from 'src/security/security.module';

Module({
  imports: [SecurityModule],
  providers: [LazyModuleLoader],
  exports: [LazyModuleLoader],
});
export class LazyModule {}
