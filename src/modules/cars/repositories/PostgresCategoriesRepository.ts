// Classe de teste para exemplificar o conceito de LSP (Liskov Substitution Principle), um dos princípios do SOLID
// Qualquer classe que implementa a interface ICategoriesRepository será subtipo dessa interface
import { Category } from '../models/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
  list(): Category[] {
    return null;
  }
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}

export { PostgresCategoriesRepository };
