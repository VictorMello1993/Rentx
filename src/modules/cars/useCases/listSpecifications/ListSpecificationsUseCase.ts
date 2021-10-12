import { Category } from '../../models/Category';
import { ISpecificationsRepository } from '../../repositories/interfaces/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Category[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
