import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
  database: string;
}

export default async (host = 'database_rentx'): Promise<Connection> => {
  return getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = process.env.NODE_ENV === 'test' ? 'localhost' : host;
    newOptions.database = process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx';

    return createConnection({
      ...options,
    });
  });
};
