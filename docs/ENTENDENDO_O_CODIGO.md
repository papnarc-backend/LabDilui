# Entendendo o LabDilui

O projeto tem duas partes principais: a regra de cálculo e a interface. Estude uma de cada vez.

## 1. A ideia química

Na diluição ideal, a quantidade de matéria do soluto permanece constante. Usando concentração molar e volume:

**C₁V₁ = C₂V₂**

Isolando V₁, encontramos o volume calculado da solução inicial:

**V₁ = (C₂ × V₂) ÷ C₁**

O programa usa concentrações em mol/L. Se o volume final for informado em mL, o resultado fica em mL; se for informado em L, o resultado fica em L.

Isso funciona porque o quociente C₂/C₁ é adimensional. Se você calcular a quantidade de matéria diretamente, precisará expressar o volume em litros para combinar com mol/L.

## 2. A função `lerDecimal`

O formulário entrega texto, mesmo quando escrevemos um número. Por isso, a função precisa:

1. retirar espaços ao redor do valor;
2. conferir se o texto tem um formato decimal permitido;
3. trocar a vírgula por ponto;
4. converter para número.

Exemplos:

```js
lerDecimal('0,25'); // 0.25
lerDecimal('0.25'); // 0.25
lerDecimal('abc');  // NaN: não é um número válido
```

A expressão regular confere a forma do texto antes da conversão. Ela aceita casas decimais, mas não separadores de milhar.

## 3. A função `calcularDiluicao`

Esta função fica em `src/calculos.js` e recebe um objeto:

```js
const entradas = {
  cInicial: '1',
  cFinal: '0,1',
  vFinal: '100',
  unidade: 'mL'
};
```

A função verifica cada campo e depois calcula:

```js
const vInicial = (cFinal / cInicial) * vFinal;
```

A divisão vem primeiro para evitar uma multiplicação intermediária desnecessariamente grande.

Quando os valores são válidos, o retorno contém `ok: true` e o resultado. Quando há um problema, o retorno contém `ok: false`, o campo que precisa de correção e uma explicação.

```js
{ ok: false, campo: 'cFinal', erro: 'Em uma diluição...' }
```

Essa estrutura permite testar o cálculo sem abrir a página.

## 4. O que faz `src/interface.js`

O arquivo da interface encontra os campos com `document.getElementById`, lê os valores e chama a regra de cálculo.

O formulário tem um evento `submit`:

```js
evento.preventDefault();
atualizar();
```

`preventDefault()` evita o envio normal do formulário e o recarregamento da página. `atualizar()` mostra o resultado ou a mensagem de erro.

O resultado é colocado na página com `textContent`, porque é texto. Quando há erro, o campo recebe `aria-invalid` e o foco volta para ele.

O botão **Restaurar exemplo** preenche novamente os valores iniciais e recalcula.

## 5. Por que separar os arquivos?

- O HTML descreve o conteúdo e os campos.
- O CSS cuida da apresentação.
- `calculos.js` concentra a regra matemática.
- `interface.js` liga essa regra ao formulário.

Assim, uma mudança na cor do botão não exige alterar a fórmula. E uma melhoria na validação pode ser testada diretamente.

## 6. O que os testes verificam?

Os testes usam o módulo nativo `node:test`. Um teste apresenta uma entrada e confere um comportamento importante:

```js
const resultado = calcularDiluicao({
  cInicial: '1', cFinal: '0,1', vFinal: '100', unidade: 'mL'
});
assert.equal(resultado.vInicial, 10);
```

Outros testes verificam se a relação C₁V₁ = C₂V₂ é preservada, se L e mL são coerentes e se valores inválidos são recusados.

## 7. Seu primeiro exercício

Calcule no papel o caso C₁ = 2 mol/L, C₂ = 0,5 mol/L e V₂ = 200 mL. O resultado é V₁ = 50 mL.

Depois:

1. confira o mesmo caso na calculadora;
2. adicione um teste para esse exemplo em `tests/calculos.test.cjs`;
3. execute os testes;
4. faça um commit com uma descrição do que você alterou.

Conseguir explicar a fórmula, a validação e o caminho dos dados é um bom objetivo para esta primeira versão.
