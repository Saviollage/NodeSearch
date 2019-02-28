# nodeApi - Buscas gerais


API desenvolvida em NodeJS com interação com API de busca de CEP, CNPJ, Latitude/Longitude (Google MAPS) e Distancias (Google MAPS).

## Uso
O body de cada requisição precisa conter as seguintes informações:

URL/searchDistance

```json
{
	"origin_addresses": " Endereço de origem  ",
	"destination_addresses": " Endereço de destino ",
	"key": " YOUR MAPS API KEY "
}
```

URL/searchlatLng

```json
{
	"latitude": " Valor de latitude ",
	"longitude": " Valor de longitude ",
	"key": " YOUR MAPS API KEY "
}
```
URL/searchCNPJ

```json
{
	"cnpj": "  CNPJ (apenas números) "
}
```

URL/searchCep

```json
{
	"cep": " CEP (apenas números) "
}
```

 
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
