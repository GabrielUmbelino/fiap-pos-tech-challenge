
# Documentação - Tech Challenge FIAP
### Grupo 66 - 9SOAT

 - Bruno Zanella
 - Gabriel Ferreira Umbelino
 - *~~*Michael Dougras da Silva*~~*
 - Victor Zaniquelli

## Introdução
Este projeto almeja atender as necessidades destacadas para a *Lanchonete Evans*, da qual, devido a seu crescimento, se viu na necessidade de um sistema sólido e coeso de pedidos que atenda suas necessidades. Este sistema de autoatendimento permitirá que os clientes façam seus pedidos de forma autônoma, utilizando dispositivos e interfaces intuitivas. Com isso, espera-se melhorar a precisão dos pedidos, reduzir o tempo de espera e aumentar a satisfação dos clientes.
A implementação deste sistema visa resolver problemas comuns em lanchonetes em expansão, como a confusão na comunicação entre atendentes e cozinha, atrasos na preparação dos pedidos e insatisfação dos clientes.

## Escopo do Sistema


### Pedido
- Interface de seleção para clientes:
  - Identificação via CPF, cadastro com nome e e-mail, ou anonimato.
  - Montagem de combo em sequência opcional:
    1. Lanche
    2. Acompanhamento
    3. Bebida
    4. Sobremesa
  - Exibição de nome, descrição e preço de cada produto em cada etapa.

### Pagamento
- Opção de pagamento integrada para MVP:
  - Pagamento via QRCode do Mercado Pago.

### Acompanhamento
- Após confirmação e pagamento do pedido:
  - Envio para a cozinha.
  - Monitor para cliente acompanhar progresso:
    - Recebido
    - Em preparação
    - Pronto
    - Finalizado

### Entrega
- Notificação ao cliente quando o pedido estiver pronto para retirada.
- Atualização do pedido para status finalizado após retirada.

### Acesso Administrativo
- **Gerenciar clientes**:
  - Identificação para campanhas promocionais.
- **Gerenciar produtos e categorias**:
  - Definição de nome, categoria, preço, descrição e imagens.
  - Categorias fixas:
    - Lanche
    - Acompanhamento
    - Bebida
    - Sobremesa
- **Acompanhamento de pedidos**:
  - Acompanhamento de pedidos em andamento e tempo de espera.
- **Painel administrativo**:
  - Gerenciamento das informações do sistema de pedidos.

### Diagramas

> TODO: Adicionar diagramas de Domain Storytelling e URL/Export do Miro (Event Storming).

### Dicionário

> TODO: Realizar o *port* do dicionário.

### Tech Stack

- Node.js v??
- TypeScript
- DB
- ...
- Docker

### Estrutura do projeto

> TODO: Adicionar a estrutura do projeto

## Instalação do projeto

Este projeto deve ser executado em um ambiente Docker, dispensando qualquer instalação adicional.
Se você não possui o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker).

> TODO: Adicionar instruções Docker


## Desenvolvimento

Deseja abrir o código na IDE? Segue o fio.

> TODO: Adicionar instruções de execução/desenvolvimento

## Execução via Postman

Se você já fez um dos passos anteriores ([Instalação do projeto](#instalação-do-projeto) ou [Desenvolvimento](#desenvolvimento)), você pode importar a coleção em JSON do Postman com todos endpoints já configurados e realizar os testes diretamente na API.
Se você não possui o Postman instalado, siga as instruções para seu sistema operacional na [documentação oficial Postman](https://learning.postman.com/docs/getting-started/installation/installation-and-updates/).

> TODO: Adicionar coleção Postman e adicionar o link a esta seção.

## Endpoints

> TODO: Documentar cada endpoint separadamente, com a URL, método HTTP e os corpos request e response.
