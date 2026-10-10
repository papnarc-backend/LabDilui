# LabDilui 🧪

Calculadora educativa de diluição ideal que conecta **Análise e Desenvolvimento de Sistemas (ADS)** e **Técnico em Química**.

**Versão:** 0.1.0 · **Status:** calculadora funcional de estudo.

Projeto de **Paulo Vicente Rocha Pinto**, integrante do portfólio **Chemistry Code**. Projeto de estudo em evolução: sigo revisando o código, testando comportamentos e desenvolvendo melhorias. O funcionamento local foi confirmado pelo autor; os exemplos são ilustrativos e não utilizam dados de laboratório real.

## Experimente no seu computador

1. Baixe os arquivos e extraia o ZIP, se estiver usando o pacote.
2. Abra `index.html` no navegador.
3. Informe as concentrações e o volume final, escolha **mL** ou **L** e clique em **Calcular volume**.

Mantenha `index.html` na raiz e preserve as pastas `src` e `styles`. A calculadora usa arquivos locais e **não exige servidor, instalação de bibliotecas ou Node.js para funcionar**. Node.js é necessário apenas para executar os testes.

## Problema, solução e resultado

### O problema

Ao estudar diluições, é preciso relacionar concentração e volume sem perder as unidades. Entradas inválidas ou uma concentração final maior que a inicial precisam ser identificadas antes de apresentar o resultado.

### A solução

Uma interface em HTML, CSS e JavaScript recebe:

- concentração inicial **C₁**, em mol/L;
- concentração final **C₂**, em mol/L;
- volume final total **V₂**, em mL ou L.

A aplicação usa a conservação da quantidade de matéria do soluto no modelo ideal:

**C₁ × V₁ = C₂ × V₂**

Isolando o volume da solução inicial:

**V₁ = (C₂ × V₂) ÷ C₁**

Como C₁ e C₂ usam a mesma unidade, o volume calculado fica na unidade escolhida para V₂.

### Resultado do exemplo

| Entrada ou resultado | Valor |
|---|---|
| Concentração inicial · C₁ | 1 mol/L |
| Concentração final · C₂ | 0,1 mol/L |
| Volume final total · V₂ | 100 mL |
| Volume calculado da solução inicial · V₁ | **10 mL** |

A página mostra a substituição dos valores na fórmula. O resultado é matemático, sem validação experimental. O modelo considera ausência de perdas e de reação do soluto; não é um procedimento para manipular substâncias.

## Funcionalidades implementadas

- Aceita vírgula ou ponto decimal, sem separadores de milhar.
- Valida números positivos e unidades de volume suportadas.
- Recusa concentração final maior que a inicial.
- Usa mL ou L e mantém essa unidade no resultado.
- Identifica concentrações iguais como ausência de redução de concentração.
- Exibe o cálculo e permite restaurar o exemplo inicial.
- Evita apresentar valores muito pequenos como zero por arredondamento.
- Inclui rótulos, mensagens de erro, indicação do campo inválido e navegação por teclado.
- Usa regras de layout para diferentes tamanhos de tela.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML | Estrutura, formulário e conteúdo |
| CSS | Aparência e regras responsivas |
| JavaScript | Validação, cálculo e atualização da interface |
| Node.js | Testes opcionais com o módulo nativo `node:test` |

O projeto não tem dependências externas.

## Organização dos arquivos

| Caminho | Responsabilidade |
|---|---|
| `index.html` | Página principal da calculadora |
| `README.md` | Apresentação e instruções do projeto |
| `package.json` | Comando de testes e versão mínima do Node.js |
| `src/calculos.js` | Leitura dos números e regra de diluição |
| `src/interface.js` | Eventos do formulário e apresentação do resultado |
| `styles/style.css` | Aparência e adaptação às telas |
| `tests/calculos.test.cjs` | Testes da regra de cálculo |
| `tests/interface.test.cjs` | Testes dos eventos da interface por simulação |
| `docs/ENTENDENDO_O_CODIGO.md` | Guia de estudo do código |
| `docs/GITHUB_PASSO_A_PASSO.md` | Envio, atualização e visibilidade no GitHub |
| `.gitignore` | Exclusão de arquivos temporários e pastas geradas |
| `.gitattributes` | Normalização dos arquivos de texto no Git |

Os dois arquivos iniciados por ponto podem ficar ocultos no Windows. A ordem de exibição dos arquivos no GitHub não interfere no funcionamento; os caminhos e os nomes das pastas precisam ser preservados.

## Executar os testes

Com **Node.js 22 ou superior**, abra o terminal na raiz do projeto:

```sh
npm test
```

Alternativa sem usar npm:

```sh
node --test tests/*.test.cjs
```

Não é necessário executar `npm install`.

A versão contém **14 testes automatizados**, executados com sucesso na revisão deste pacote. Eles verificam o exemplo de referência, a relação C₁V₁ = C₂V₂, coerência entre L e mL, entradas inválidas, concentrações iguais, limites numéricos e eventos do formulário. Os testes da interface simulam o DOM; não verificam a aparência em um navegador real.

## O que estou estudando

- Como transformar uma fórmula em uma função JavaScript.
- Como separar a regra de cálculo da interface.
- Como validar entradas e explicar erros ao usuário.
- Como testar comportamentos importantes e documentar um projeto no GitHub.

Veja o [guia para entender o código](docs/ENTENDENDO_O_CODIGO.md).

## Próximos passos

Ideias ainda **não implementadas**:

- Acrescentar capturas de tela reais da aplicação em funcionamento.
- Registrar um histórico de cálculos.
- Criar a mesma regra em Python e comparar os resultados.
- Explorar outras unidades de concentração com conversões e hipóteses explícitas.

## Compartilhar no GitHub

O [guia do GitHub](docs/GITHUB_PASSO_A_PASSO.md) explica como atualizar um repositório existente e, quando o autor decidir, tornar o código público. A hospedagem de uma página para usar a calculadora é uma etapa separada. A visibilidade do portfólio Chemistry Code é administrada separadamente.

O campo `"private": true` em `package.json` impede publicação do projeto como pacote npm; a visibilidade do repositório é definida no GitHub.

## Autor

**Paulo Vicente Rocha Pinto** · estudante de ADS e Técnico em Química.

## Referências técnicas

- [Adicionar arquivos — GitHub Docs](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Definir visibilidade — GitHub Docs](https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
- [Test runner — Node.js](https://nodejs.org/api/test.html)
