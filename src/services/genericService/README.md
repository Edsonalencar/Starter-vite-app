## Generic Service

### Visão Geral

O **GenericService** tem como objetivo fornecer uma estrutura genérica para implementação de serviços com operações básicas de CRUD para cada entidade. Ele segue um padrão de chamadas definido, garantindo consistência nas requisições. Para rotas que fogem desse padrão, é possível estender a classe e adicionar métodos específicos.

Além disso, o `GenericService` recebe uma instância de `IApiService`, permitindo flexibilidade na escolha da base de requisições. Isso significa que qualquer biblioteca de requisição HTTP pode ser utilizada, como Axios, Fetch ou outra implementação customizada, desde que implemente a interface `IApiService`.

🚨 OBS: O `GenericService` só funciona se o backend tiver implementações padronizadas, seguindo as instruções abaixo.

Além disso, é possível modificar o formato padrão das rotas utilizando um `resolver`. O `resolver` permite que cada serviço defina sua própria estrutura de URLs, garantindo maior flexibilidade para adaptar-se a diferentes APIs. Caso seja necessário modificar a estrutura das URLs, um `resolver` personalizado pode ser passado para o `GenericService`, alterando a maneira como os endpoints são construídos.

---

## Métodos Padrões e Rotas Default

Ao instanciar um `GenericService`, é passado o endpoint base da instância, e todos os métodos serão aplicados sobre essa raiz.

| Método   | Rota Padrão      | Descrição |
|----------|-----------------|------------|
| `create` | `/`             | POST na raiz do endpoint enviando um payload (dados). |
| `get`    | `/`             | GET na raiz do endpoint para buscar uma lista de itens. |
| `getById`| `/{id}`         | GET para buscar um item específico pelo ID. |
| `update` | `/{id}`         | PUT para atualizar um item específico pelo ID. |
| `patch`  | `/{id}`         | PATCH para modificar parcialmente um item específico pelo ID. |
| `delete` | `/{id}`         | DELETE para remover um item específico pelo ID. |
| `getPage`| `/page/{page}`  | POST passando a página desejada e um payload com filtros e parâmetros de paginação. |

Caso seja necessário modificar esse formato, um `resolver` pode ser fornecido ao `GenericService` para personalizar as URLs utilizadas.

---

## Exemplo de Uso

### **Instância Padrão**

```typescript
import axios from "axios";
import { GenericService } from "./GenericService";
import { IApiService } from "./IApiService";

const apiInstance: IApiService = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const UserService = new GenericService('/payment/customers', apiInstance);
```

---

### **Instância com Método Específico**

Caso seja necessário adicionar um método específico que não siga o padrão de CRUD, podemos estender o `GenericService` e adicionar o novo método:

```typescript
class UserService extends GenericService {
  getMetricsPage = async (page: number = 0, data: MetricsDTO) => {
    return await this.getApi().post<ResponseDTO<Page<UserMetrics>>>(
      `${this.getURL()}/metrics/page/${page}`,
      data
    );
  };
}

export const userService = new UserService('/payment/customers', apiInstance);
```

---

### **Instância com Resolver Personalizado**

Caso seja necessário modificar o formato das rotas, um `resolver` personalizado pode ser utilizado:

```typescript
import { IEndpointResolver } from "./IEndpointResolver";

class CustomResolver implements IEndpointResolver {
  constructor(private baseURL: string) {}

  getRoot(): string {
    return `${this.baseURL}/custom`;
  }

  getById(id: string | number): string {
    return `${this.baseURL}/custom/${id}`;
  }

  update(id: string | number): string {
    return `${this.baseURL}/custom/${id}/edit`;
  }

  delete(id: string | number): string {
    return `${this.baseURL}/custom/${id}/remove`;
  }

  getPage(page: number): string {
    return `${this.baseURL}/custom/page/${page}`;
  }

  patch(id: string | number): string {
    return `${this.baseURL}/custom/${id}/modify`;
  }
}

const customResolver = new CustomResolver('/payment/customers');
export const CustomUserService = new GenericService('/payment/customers', apiInstance, customResolver);
```

---

## **Benefícios do GenericService**
✅ **Padronização**: Todas as entidades seguem um modelo consistente de chamadas à API.  
✅ **Reutilização**: Reduz duplicação de código ao centralizar operações comuns.  
✅ **Extensibilidade**: Permite sobrescrever ou adicionar novos métodos específicos para cada entidade.  
✅ **Baixo Acoplamento**: Facilita a manutenção e a troca de implementação de API sem impacto direto nas chamadas.  
✅ **Flexibilidade**: Permite a utilização de diferentes clientes HTTP, como Axios, Fetch ou qualquer outra implementação compatível com `IApiService`.  
✅ **Personalização de URLs**: Com o uso de um `resolver`, é possível modificar o formato padrão das rotas sem alterar a estrutura do `GenericService`.

Caso precise adicionar métodos customizados, basta estender a classe e definir novas funções seguindo as diretrizes acima.