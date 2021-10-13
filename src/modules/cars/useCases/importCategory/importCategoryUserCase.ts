import fs from 'fs';
import csvParse from 'csv-parse';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    // Leitura de arquivos em batch, otimizando a performance da aplicação
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    // Lendo linha por linha do arquivo csv, cada uma delas representando um array de dados de categoria de carros
    parseFile.on('data', async line => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
