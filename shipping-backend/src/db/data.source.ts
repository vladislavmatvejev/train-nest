import { DataSource, DataSourceOptions } from 'typeorm';

export const dbdatasource: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: true,
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
