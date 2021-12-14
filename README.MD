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
* Deve ser possível cadastrar um aluguel.

**Regras de negócio**
* O aluguel deve ter duração mínima de 24 horas.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

## Link dos enpoints

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Rentx%20-%20Ignite%20Rocketseat&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVictorMello1993%2Fed3660a8b692828ec6b08f3fe6ab793e%2Fraw%2F7ffe82e67c94b355f68cf801386c92e266aa0697%2FInsomnia_2021-12-13.json)
