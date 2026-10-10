# Preparar, atualizar e compartilhar o LabDilui no GitHub

Este guia atende tanto quem já criou o repositório quanto quem está fazendo o primeiro envio. Atualizar os arquivos e mudar a visibilidade são etapas separadas.

## 1. Execute e confira os arquivos

No Windows, clique com o botão direito no ZIP e use **Extrair Tudo**. Abra a pasta `labdilui` e dê dois cliques em `index.html`.

Confira três comportamentos:

1. C₁ = 1 mol/L, C₂ = 0,1 mol/L e V₂ = 100 mL devem resultar em **10 mL**.
2. C₁ = 1 mol/L, C₂ = 0,1 mol/L e V₂ = 0,1 L devem resultar em **0,01 L**.
3. Uma concentração final maior que a inicial deve mostrar uma mensagem de erro.

Se tiver Node.js 22 ou superior, execute `npm test` na raiz. A versão 0.1.0 possui 14 testes.

## 2. Confira a organização

| Na raiz do repositório | Nas pastas |
|---|---|
| `index.html` | `src/calculos.js` e `src/interface.js` |
| `README.md` | `styles/style.css` |
| `package.json` | `tests/calculos.test.cjs` e `tests/interface.test.cjs` |
| `.gitignore` e `.gitattributes` | `docs/ENTENDENDO_O_CODIGO.md` e `docs/GITHUB_PASSO_A_PASSO.md` |

A ordem dos arquivos na tela não importa. O que importa é preservar os nomes e os caminhos. Envie o conteúdo **de dentro** da pasta `labdilui`, para que `index.html` fique diretamente na raiz do repositório.

## 3. Atualize o repositório existente

1. Abra seu repositório LabDilui no GitHub e selecione a aba **Code**.
2. Use **Add file → Upload files**.
3. Arraste os arquivos extraídos, preservando as pastas.
4. Para esta revisão, os arquivos alterados são `README.md` e `docs/GITHUB_PASSO_A_PASSO.md`. Eles devem substituir os arquivos de mesmo nome e caminho.
5. Confira a lista antes de confirmar. O ZIP sozinho não substitui os arquivos do projeto.
6. Use a mensagem **Melhorar README e guia de publicação do LabDilui**.
7. Confirme em **Commit changes** e abra o README para conferir a apresentação.

Para alterar apenas o README, você também pode abrir `README.md`, clicar no ícone de lápis, substituir o conteúdo pelo texto revisado e confirmar em **Commit changes**. O guia dentro de `docs` é atualizado separadamente.

Se não conseguir selecionar arquivos iniciados por ponto, adicione `.gitignore` e `.gitattributes` depois pelo GitHub. Eles ajudam a organizar o repositório, mas não são necessários para abrir a calculadora.

## 4. Se ainda não criou o repositório

Abra [github.com/new](https://github.com/new) e preencha:

| Campo | Sugestão |
|---|---|
| Repository name | `LabDilui` |
| Description | `Calculadora educativa de diluição ideal que une ADS e Técnico em Química.` |
| Visibility inicial | **Private** |

Finalize em **Create repository** e siga o envio da etapa 3. Se inicializar com um README, substitua esse arquivo pelo README do pacote.

## 5. Quando decidir tornar o código público

Depois de conferir os arquivos, o README e os testes:

1. Abra **Settings** do repositório.
2. Na página **General**, desça até **Danger Zone**.
3. Localize **Change repository visibility** e clique em **Change visibility**.
4. Escolha **Change to public** ou a opção de visibilidade **Public** que aparecer.
5. Confira o nome do repositório, leia os efeitos indicados e conclua as confirmações do GitHub.
6. Verifique se o indicador ao lado do nome mudou para **Public**.

Ao tornar o repositório público, o código e o histórico de alterações ficam visíveis a outras pessoas. Este pacote contém código, documentação e exemplos ilustrativos, sem dados de laboratório real. Confira também os arquivos e o histórico que você adicionou na sua conta.

Essa mudança permite compartilhar o link do repositório no LinkedIn. Ela não configura uma página hospedada da calculadora nem altera o acesso ao portfólio Chemistry Code.

O `"private": true` do `package.json` trata da publicação como pacote npm e pode continuar assim mesmo com o repositório público.

## 6. Adicione uma imagem real depois

Execute `index.html`, use o exemplo inicial e capture a calculadora com o resultado de 10 mL. Salve a imagem em `docs/images/labdilui.png` e, depois de enviar o arquivo, acrescente ao README:

```md
![LabDilui em funcionamento, com resultado de 10 mL](docs/images/labdilui.png)
```

O pacote revisado ainda não inclui essa imagem. Acrescente o link somente depois de ter o arquivo real no caminho indicado.

## Referências oficiais

- [Adicionar arquivos — GitHub Docs](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Definir visibilidade — GitHub Docs](https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
- [Criar repositório — GitHub Docs](https://docs.github.com/pt/repositories/creating-and-managing-repositories/creating-a-new-repository)
