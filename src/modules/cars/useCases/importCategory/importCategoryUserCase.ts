import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Leitura de arquivos em batch, otimizando a performance da aplicação
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      // Lendo linha por linha do arquivo csv, cada uma delas representando um array de dados de categoria de carros
      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          /* Ao final da leitura do arquivo, será feita a remoção do mesmo da pasta tmp, 
          para não precisar dela uma vez que os dados de uma categoria de carro são persistidos no banco de dados.
          A remoção é feita chamando o método unlink(), da própria biblioteca nativa fs. */
          fs.promises.unlink(file.path);

          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }
}

export { ImportCategoryUseCase };
