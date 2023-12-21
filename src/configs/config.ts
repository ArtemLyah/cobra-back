import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { ConfigSchema } from './configSchema';

const YAML_CONFIG_FILEPATH = '.env.yaml';

export const configuration = () => {
  return yaml.load(
    readFileSync(`./${YAML_CONFIG_FILEPATH}`, 'utf8'),
  ) as ConfigSchema;
};

export const postgresConfig = (entities: Function[]) => {
  const dbConfig = configuration().databases.postgres;
  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: true,
    autoLoadEntities: true,
    entities,
  } as TypeOrmModuleOptions;
};

export const mongoConfig = () => {
  const dbConfig = configuration().databases.mongo;
  return `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
};