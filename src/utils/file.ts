import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename); // Verificando se o arquivo existe no diretório
  } catch {
    return;
  }

  // Removendo fisicamente o arquivo do diretório
  await fs.promises.unlink(filename);
};
