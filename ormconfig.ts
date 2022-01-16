import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import configuration from './src/config/configuration';

const config = configuration();

const dbConfig = () => {
  if (config.sqlite) {
    return {
      type: 'sqlite',
      database: config.sqlite.DB_DATABASE,
      entities: config.sqlite.DB_ENTITIES,
      migrations: config.sqlite.DB_MIGRATIONS,
      cli: {
        migrationsDir: config.sqlite.DB_CLI,
      },
      synchronize: false,
      logging: false,
    };
  } else {
    const postgresConfig: PostgresConnectionOptions = {
      type: 'postgres',
      host: config.database.DB_HOST as string,
      port: config.database.DB_PORT as number,
      username: config.database.DB_USERNAME as string,
      password: config.database.DB_PASSWORD as string,
      database: config.database.DB_DATABASE as string,
      entities: [config.database.DB_ENTITIES as string],
      migrations: [config.database.DB_MIGRATIONS as string],
      cli: {
        migrationsDir: config.database.DB_CLI as string,
      },
    };
  // console.log('siema', postgresConfig)
    return postgresConfig;
  }
};

export default dbConfig();
