import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database_rentx'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  console.log(process.env.NODE_ENV);

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database,
    }),
  );
};
