# Imagem base
FROM node

# Diretório de trabalho
WORKDIR /usr/app

# Copiando o package.json da raíz da aplicação da máquina local para o diretório de trabalho do container (/usr/app)
COPY package*.json ./

RUN npm install

# Copia tudo para o diretório de trabalho do container
COPY . .

# Expondo a porta da imagem do container
EXPOSE 3333

# Executando o script de inicialização do servidor que está na imagem do container
CMD ["npm", "run", "dev"]