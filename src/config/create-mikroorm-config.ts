import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { migrationsOptions } from '../migration/migration-list';
import { entities } from './entities';

export const createMikroormConfig = (configService) => {
  const config: MikroOrmModuleOptions = {
    //registerRequestContext: false,
    entities: entities,
    dbName: configService.get('DATABASE_NAME'),
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    user: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    type: 'mysql',
    driver: MySqlDriver,
    migrations: migrationsOptions,
    cache: {
      enabled: configService.get('DATABASE_CACHE_ENABLED') == 'true',
    },
    resultCache: { expiration: -1 },
  };

  return config;
};
