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
* [] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

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
* [] Deve ser possível realizar a busca de todos os alugueis para o usuário

**Regras de negócio**
* [] O usuário deve estar logado na aplicação

## Link dos enpoints

**Insomnia**

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Rentx%20-%20Ignite%20Rocketseat&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2Fed3660a8b692828ec6b08f3fe6ab793e%2Fraw%2F7ffe82e67c94b355f68cf801386c92e266aa0697%2FInsomnia_2021-12-13.json)

**Postman**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/91f8ed5e22767635c704?action=collection%2Fimport)
