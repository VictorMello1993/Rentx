import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { StorageProvider } from './StorageProvider/implementations/StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider);
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider());
container.registerInstance<IStorageProvider>('StorageProvider', new StorageProvider());
