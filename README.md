# Appointment Scheduler

Este projeto é um sistema completo de agendamento de compromissos, com backend em Symfony e frontend em Next.js.

A API fornece operações completas (CRUD) para gerenciar compromissos com suporte a múltiplas datas e horários. Já o frontend oferece uma interface moderna onde os usuários podem criar, editar e visualizar seus agendamentos de forma intuitiva.

> Este projeto foi originalmente desenvolvido como parte de um desafio técnico e aprimorado para compor meu portfólio.

A infraestrutura do projeto é gerenciada por Docker, o que facilita a configuração de um ambiente consistente e pronto para uso.

## Getting Started


### Dependências
Para executar este projeto, você precisará do [Docker](https://www.docker.com/) instalado (há um arquivo docker-compose na raiz do projeto).

### Tecnologias Utilizadas
**Backend - Symfony**

Symfony 6.4: Framework PHP usado para construir a API RESTful do sistema.
Doctrine ORM: Usado para mapeamento objeto-relacional e manipulação de dados no banco de dados.
MariaDB: Banco de dados relacional para armazenar os compromissos.
API Platform: Framework que facilita a criação de APIs REST, porém, as rotas foram configuradas manualmente neste projeto.

**Frontend - Next.js**

Next.js 15: Framework React para a criação do frontend, utilizando a nova estrutura de App Router e Partial Prerendering.
Tailwind CSS: Framework CSS utilitário para estilização rápida e eficiente.
React: Biblioteca JavaScript para construir a interface de usuário.

**Infraestrutura - Docker**

Docker: Utilizado para encapsular todo o projeto em containers, garantindo que o ambiente de desenvolvimento seja idêntico ao de produção.
Docker Compose: Orquestra os containers do projeto, incluindo PHP, Nginx e MariaDB.


### Arquitetura

**Backend**: A API foi construída com base no conceito de recursos REST, fornecendo endpoints para criar, atualizar, deletar e listar compromissos. As operações básicas de CRUD são realizadas com controle de transações utilizando o Doctrine ORM.

**Frontend**: A interface foi construída em Next.js, utilizando o modelo de renderização híbrido (SSR e SSG) para pré-renderizar páginas estáticas e carregar dinamicamente os dados necessários, mantendo o site rápido e otimizado.

**Docker**: O projeto usa containers separados para o PHP (rodando Symfony), Nginx (para servir as páginas) e MariaDB (banco de dados), garantindo modularidade e facilidade na manutenção.

### Instalando
**Clonando o repositório**
```shell
$ git clone https://github.com/ph-gaia/appointment-scheduler.git

$ cd appointment-scheduler
```
**Inicie os containers Docker:**
```
$ docker-compose up --build
```

**Acesse a aplicação:**

API: A API estará disponível em http://localhost:8080/api

Frontend: O frontend estará disponível em http://localhost:3000/appointments

### Endpoints da API

A API RESTful permite operações básicas para gerenciar compromissos. Exemplo de endpoints:

- GET /api/appointments: Listar todos os compromissos.
- POST /api/appointments: Criar um novo compromisso.
- PUT /api/appointments/{id}: Atualizar um compromisso.
- DELETE /api/appointments/{id}: Deletar um compromisso.

## Author
- [Paulo Henrique Coelho Gaia](https://www.linkedin.com/in/ph-gaia)
