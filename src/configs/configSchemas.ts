class ServerConfig {
  host: string;
  port: number;
}

class DatabaseConfig {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

export class ConfigSchema {
  server: ServerConfig;
  databases: {
    postgres: DatabaseConfig,
    mongo: DatabaseConfig,
  };
}