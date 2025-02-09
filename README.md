# Base Project Template

Este repositório é um template base para projetos utilizando as seguintes tecnologias:

- **Vite** como bundler.
- **React** para construção da interface.
- **TailwindCSS** para estilização.
- **Ant Design** para componentes prontos e design system.
- **Atomic Design** como padrão de componentização.

## Visão Geral

Este projeto foi desenvolvido para acelerar o início de novos aplicativos, oferecendo uma estrutura consistente para autenticação, configurações iniciais e um sistema organizacional baseado no Atomic Design.

### Estrutura do Projeto

Abaixo está um resumo da estrutura de pastas:

```
src/
├── components/      # Componentes organizados seguindo Atomic Design
├── services/        # Integrações com APIs e funções relacionadas
├── config/          # Configurações do sistema [rotas, thema do ant, items do menu]
├── utils/           # Funções utilitárias e formatadores
├── styles/          # Estilos globais e configurações do TailwindCSS
├── assets/          # Imagens, ícones e outros recursos
└── App.jsx          # Arquivo principal do React
```

## Tecnologias

- [**Vite**](https://vite.dev/guide): Build rápido e eficiente para desenvolvimento e produção.
- [**React**](https://react.dev): Biblioteca para construir interfaces de usuário.
- [**React Router Dom**](https://reactrouter.com/start/library/routing): Biblioteca para roteamento de paginas do React.
- [**TailwindCSS**](https://tailwindcss.com/docs/flex): Framework de CSS utilitário para estilização moderna.
- [**Ant Design**](https://ant.design/components/button): Biblioteca de componentes com estilos consistentes.
- [**Ant Design plots**](https://ant-design-charts.antgroup.com/en/examples): Biblioteca construção de graficos com estilos consistentes.
- [**React Icons**](https://react-icons.github.io/react-icons): Biblioteca de icones.

## Atomic Design

Os componentes estão organizados conforme o padrão de Atomic Design:

1. **Atoms**: Componentes básicos e indivisíveis (ex.: botões, inputs).
2. **Molecules**: Combinação de átomos para formar blocos funcionais.
3. **Organisms**: Combinação de módulos e elementos complexos.
4. **Templates**: Estruturação da disposição das páginas.
5. **Pages**: Representação completa de uma página (Pagina final apresentada ao usuário).

## Autenticação

A autenticação foi implementada com foco em extensibilidade e segurança, suportando:

- Login e logout.
- Controle de acesso baseado em permissões.
- Persistência de sessão.

---

## Configuração e Services

### Pasta `config`

A pasta `config` centraliza as configurações globais da aplicação:

- **Items do menu**: Estrutura o menu de navegação lateral do LayoutTemplate
- **Configurações de tema**: Define configurações específicas para o TailwindCSS e Ant Design.
- **Rotas**: Mapeamento de rotas da aplicação para facilitar o gerenciamento de navegação.

As rotas seguem um padrão de montagem definido pelo tipo RenderRouter!

Exemplo:

```javascript
{
  path: "/app",
  component: LayoutTemplate,
  children: [{ path: "/app", component: StarterPage }],
}
```

### Pasta `services`

A pasta `services` contém as integrações com APIs externas e as funções relacionadas à comunicação com o backend. Cada serviço segue a estrutura modular:

- Cada pasta representa um serviço específico e pode conter o arquivo  `service.ts` e `dto.ts`.
- Uso de uma abstração do Fetch Api chamada BaseApi.
- Disponibilidade para utilizar o GenericService, classe que implementa automaticamente um crud básico para API's padronizadas.
- Centralização de URLs e headers para facilitar a manutenção.

Segue documentação do GenericService:

[Leia mais sobre a API](./src/services/genericService/README.md)

---

## Como Usar Este Template

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env-example
   Copie e cole e renomeei o arquivo .env-example para .env
   ```

4. Inicie o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse em: [http://localhost:3000](http://localhost:3000).

## Contribuição

Se você deseja contribuir com este projeto, envie um pull request com as alterações ou melhorias desejadas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).