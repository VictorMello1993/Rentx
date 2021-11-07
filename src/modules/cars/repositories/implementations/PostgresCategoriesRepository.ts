// Classe de teste para exemplificar o conceito de LSP (Liskov Substitution Principle), um dos princípios do SOLID
// Qualquer classe que implementa a interface ICategoriesRepository será subtipo dessa interface
import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../interfaces/ICategoriesRepository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log(name, description);
  }
  list(): Promise<Category[]> {
    return null;
  }
  findByName(name: string): Promise<Category> {
    console.log(name);
    return null;
  }
}

export { PostgresCategoriesRepository };
