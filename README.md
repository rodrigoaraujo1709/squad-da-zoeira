# Squad da Zoeira

Site estático em HTML, CSS e JavaScript puro para apresentar o álbum **Squad da Zoeira** com capa, player, CD girando, tracklist clicável e letras carregadas dos arquivos `.txt`.

## Estrutura

```text
index.html
style.css
script.js
Img/
Letras/
Musicas/MP3/
```

Os caminhos das músicas e letras ficam no array `tracks` dentro de `script.js`.

## Rodar localmente

Como as letras são carregadas com `fetch`, abra o projeto por um servidor local.

Com Python instalado:

```powershell
cd "C:\Users\rodri\Documents\Projetos\Squad da zoeira"
py -m http.server 8000
```

Com Node/npm:

```powershell
cd "C:\Users\rodri\Documents\Projetos\Squad da zoeira"
npx http-server . -p 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas do projeto, mantendo os nomes originais.
3. No GitHub, abra **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch principal e a pasta `/root`.
6. Salve e aguarde o link do Pages ficar disponivel.

Observação: no GitHub Pages, nomes de arquivos com acentos e espaços funcionam, mas precisam estar exatamente iguais aos caminhos usados no `script.js`.
