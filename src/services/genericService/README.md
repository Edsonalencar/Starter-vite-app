## Generic Service

### Visão Geral

O **GenericService** tem como objetivo fornecer uma estrutura genérica para implementação de serviços com operações básicas de CRUD para cada entidade. Ele segue um padrão de chamadas definido, garantindo consistência nas requisições. Para rotas que fogem desse padrão, é possível estender a classe e adicionar métodos específicos.

Além disso, o `GenericService` recebe uma instância de `IApiService`, permitindo flexibilidade na escolha da base de requisições. Isso significa que qualquer biblioteca de requisição HTTP pode ser utilizada, como Axios, Fetch ou outra implementação customizada, desde que implemente a interface `IApiService`.

🚨 OBS: O `GenericService` só funciona se o backend tiver implementações padronizadas, seguindo as instruções abaixo.

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

## **Benefícios do GenericService**
✅ **Padronização**: Todas as entidades seguem um modelo consistente de chamadas à API.  
✅ **Reutilização**: Reduz duplicação de código ao centralizar operações comuns.  
✅ **Extensibilidade**: Permite sobrescrever ou adicionar novos métodos específicos para cada entidade.  
✅ **Baixo Acoplamento**: Facilita a manutenção e a troca de implementação de API sem impacto direto nas chamadas.  
✅ **Flexibilidade**: Permite a utilização de diferentes clientes HTTP, como Axios, Fetch ou qualquer outra implementação compatível com `IApiService`.  

Caso precise adicionar métodos customizados, basta estender a classe e definir novas funções seguindo as diretrizes acima.