## Generic Service

Como o nome sugeri, a intenção do generic service é estruturar um service generico que implementa o crud basico de cada entidade, para isso ele segue um padrão de chamada que deve ser seguido pelas rotas, toda rota que fugir desse psdrão deverá ser estendida dentro do generic, segue instruções.

## Metodos padrões e suas rotas Default

ao instânciar um GenericService é passado o endpoint da instancia e todos os metodos serão aplicados na raiz dessa instância.

- create `/`: Post na raiz do endpoint passando um Data/Payload.
- get `/`: Get na raiz do endpoint.
- getById `/{id}`: Get de um item.
- update `/{id}`: Update de um item.
- update `/{id}`: Delete de um item.
- getPage `/page/{page}`: Post passando a pagina desejada e um Data que pode conter as instruções de filtro

### Exemplo de uma instância padrão.

```export const UserService = new GenericService('/payment/customers')```


### Exemplo de uma instância com adição de um metodo especifico.

```
class userService extends GenericService {
  getMetricsPage = async (page: number = 0, data:MetricsDTO) => {
      return await this.getApi().post<ResponseData<Page<UserMetrics>>>(`${this.getURL()}/metrics/page/${page}`, data);
  };
}

export const UserService = new userService('/payment/customers')
```
