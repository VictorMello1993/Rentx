import { container, delay } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const storage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  delay(() => storage[process.env.disk]),
);
