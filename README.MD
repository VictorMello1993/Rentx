## Cadastro de carros

**Requisitos funcionais**
* [x] Deve ser possível cadastrar um novo carro

**Regras de negócio**
* [x] Não deve ser possível cadastrar um carro com uma placa já existente.
* [x] O carro deve ser cadastrado, por padrão, com disponibilidade.
* [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

## Listagem de carros

**Requisitos funcionais**
* [x] Deve ser possível listar todos os carros disponíveis.
* [x] Dever ser possível listar todos os carros disponíveis pelo nome da categoria.
* [x] Dever ser possível listar todos os carros disponíveis pelo nome da marca.
* [x] Dever ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de negócio**
* [x] O usuário não precisa estar logado no sistema.

## Cadastro de especificação no carro

**Requisitos funcionais**
* [x] Deve ser possível cadastrar uma especificação para um carro.

**Regras de negócio**
* [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

* [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro

* [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro

**Requisitos funcionais**
* [x] Deve ser possível cadastrar a imagem do carro 

**Requisitos não funcionais**
* [x] Utilizar o multer para upload dos arquivos.

**Regras de negócio**
* [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
* [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

## Aluguel de carro

**Requisitos funcionais**
* [x] Deve ser possível cadastrar um aluguel.

**Regras de negócio**
* [x] O aluguel deve ter duração mínima de 24 horas.
* [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
* [x] O usuário deve estar logado no sistema.
* [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**Requisitos funcionais**
* [x] Deve ser possível realizar a devolução de um carro

**Regras de negócio**
* [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
* [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
* [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
* [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
* [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional
     aos dias de atraso
* [x] O usuário deve estar logado no sistema.
* [x] Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de algueis para usuário

**Requisitos funcionais**
* [x] Deve ser possível realizar a busca de todos os alugueis para o usuário

**Regras de negócio**
* [x] O usuário deve estar logado na aplicação

# Recuperação de senha
**Requisitos funcionais**
* [x] Deve ser possível o usuário recuperar a senha informando o e-mail
* [x] O usuário deve receber e-mail com o passo a passo para a recuperação de senha
* [x] O usuário deve conseguir inserir uma nova senha

**Regras de negócio**
* [x] O usuário precisa informar uma nova senha
* [x] O link enviado para a recuperação deve expirar em 3 horas

## Conteúdos abordados
* Construção de uma API
* 5 princípios SOLID
* Documentação da API com Swagger
* Docker
* Testes unitários e de integração com Jest
* Construindo banco de dados da API com Typeorm (driver de banco selecionado: Postgres)
* Modelagem de dados
* Autenticação e autorização com JWT
* Refresh token
* Envio de e-mail utilizando Ethereal e SES da AWS
* Deploy utilizando serviços da AWS. Foram utilizados S3, EC2, SES, IAM e Route 53 
* Pipeline CI/CD utilizando Github Actions
* Segurança utilizando Redis com Rate Limiter para evitar ataques DDoS
* Gerenciamento de erros utilizando Sentry

# Extras
* Serverless
* Explorando um pouco do Prisma

## Link dos enpoints

**Insomnia**

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Rentx%20-%20Rocketseat%20-%20Node.js&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2Fd5551335476de7f0a0037a7eb3f62761%2Fraw%2F440e1793da91019f40615f022206bab853ecb8bd%2Fgistfile1.txt)

**Postman**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3d5f051d0d1da11ec00b?action=collection%2Fimport)
