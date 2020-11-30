# Backend para o PetFinder
O Backend para o aplicativo Pet Finder foi desenvolvido utilizando NodeJs e TypeScript, no modelo MVC. Utilizei o TypeORM para realizar Migrations, e a comunicação com o banco de dados relacional PostGres SQL.

## Como Rodar
Para rodar no projeto é necessário ter o yarn em sua máquina.
```bash
npm install -g yarn
```

E instalar as dependências do projeto:
```bash
yarn install
```

Realize as migrations(Obs: É necessário ter o PostGres configurado em sua máquina): 
```bash
yarn typeorm migration:run
```

Para rodar o projeto, utilize:
```bash
yarn dev::server
```
## Modelo de Entidade Relacionamento
![Fluxo do OCR](er.jpg "Entidade e Relacionamento")

Nós temos as seguintes tabelas, com os seguintes campos:

### Usuários:
* id : Id do Usuário
* nome: Nome do Usuário
* password: Senha encriptografada do Usuário
* created_at: Data e Hora de quando o usuário foi criado.
* updated_at: Data e Hora de quando o usuário foi atualizado.

### Endereço (Eu sei que no E-mail solicitava que o endereço deveria ser em uma string, mas para relacionar a cidade com o Animal, a string não funcionaria, além de um usuário poder ter mais de um endereço):

* id : Id do Endereço
* rua: Rua da Casa
* numero: Número da Casa
* bairro: Bairro da Casa
* cidade: Cidade da Casa
* estado: Estado da Casa
* created_at: Data e Hora de quando o endereço foi criado.
* updated_at: Data e Hora de quando o endereço foi atualizado.
* ativo: Define se é o endereço principal do Usuário.

### Animal:
* id : Id do Animal
* usuario_criador_id : O usuário que está doando o cachorro
* usuario_adotante_id : O usuário que adotou ou solicitou a adoção do cachorro
* nome: Nome do cachorro
* raca: Raça do cachorro
* peso: Peso do cachorro
* idade: Idade do cachorro
* cidade: Cidade do cachorro
* aceitoCriador: Campo para validar a adoção por parte do doador.
* created_at: Data e Hora de quando o animal foi criado.
* updated_at: Data e Hora de quando o animal foi atualizado.

## Rotas
Endpoint | MÉTODO | Autenticação necessária | Descrição
--- | --- | --- | --- 
/usuarios | POST | Não | Realiza o Cadastro dos Usuários
/usuarios | GET | Sim | Retorna as informações do Usuário logado
/session | POST | Não | Realiza o Login do usuário, seguindo o padrão Json Web Token.
/endereco | POST | Sim | Realiza o Cadastro de Endereço e relaciona com o usuário logado.
/endereco/principal | POST | Sim | Define o endereço principal para o usuário.
/animais | POST | Sim | Realiza o cadastro de um Animal.
/animais | GET | Não | Consulta os Animais disponíveis para adoção.
/animais/:id | GET | Sim | Consulta um Animal por id.
/animais/:id | DELETE | Sim | Deleta um Animal por id.
/animais/update | POST | Sim | Realiza a atualização de um Animal.
/animais/adotar | POST | Sim | Realiza a Adoção de um Animal.
/animais/aprovar | POST | Sim | Realiza a Aprovação de um Animal.
/animais/recusar | POST | Sim | Recusa a proposta de adoção de um Animal.
/animais/lista/adotar | POST | Sim | Lista todos os pets disponíveis para adoção.
/animais/lista/aprovar | POST | Sim | Lista todos os pets disponíveis para aprovação.
/animais/lista/adotados | POST | Sim | Lista todos os pets adotados pelo usuário.
/animais/lista/criados | POST | Sim | Lista todos os pets criados pelo usuário.



