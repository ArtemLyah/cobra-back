import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { ConfigSchema } from './configSchemas';

const YAML_CONFIG_FILEPATH = '.env.yaml';

export const configuration = () => {
  return yaml.load(
    readFileSync(`./${YAML_CONFIG_FILEPATH}`, 'utf8'),
  ) as ConfigSchema;
};

export const postgresConfig = (entities: Function[]) => {
  const config = configuration().databases.postgres;
  return {
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: true,
    autoLoadEntities: true,
    entities,
  } as TypeOrmModuleOptions;
};

export const mongoConfig = () => {
  const config = configuration().databases.mongo;
  return `mongodb://${config.host}:${config.port}/${config.database}`;
};