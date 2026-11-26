# Portfólio Artístico — Sarah Vithoria Farias

Site estático desenvolvido para apresentar o portfólio de artes visuais de **Sarah Vithoria Farias**, originalmente estruturado apenas em PDF, transformado em uma galeria web responsiva, acessível e otimizada para hospedagem no **GitHub Pages**.

---

## Sobre a Artista

**Sarah Vithoria Farias** é estudante de **Artes Visuais na FMU**. Seu trabalho reúne diferentes processos, suportes e linguagens visuais, transitando entre:

- **Escultura & Objeto:** argila, engobe, esmalte, biscuit e materiais alternativos.
- **Pintura & Pastel:** têmpera a ovo sobre madeira, giz pastel seco e tinta acrílica sobre disco de vinil.
- **Papel & Ilustração:** quilling/curling, estudos de harmonia cromática em papel Color Plus, lápis aquarelável e nanquim.

**Contato da artista:**
- LinkedIn: [Sarah Vithoria Farias](https://www.linkedin.com/in/sarah-vithoria-farias-3789b132b)
- E-mail: `vsarah974@gmail.com`

---

## Sobre o Projeto

### Principais recursos
- **Galeria interativa com filtros:** filtragem dinâmica por técnica (*Escultura & Objeto*, *Pintura & Pastel*, *Papel & Ilustração*) com transição suave e suporte a `prefers-reduced-motion`.
- **Modal com carrossel acessível:** visualização ampliada das obras com contador de fotos, indicadores, navegação por setas do teclado e botão direto para consulta sobre a obra.
- **Desempenho otimizado:** acervo convertido para **WebP**, favicon vetorial leve, carregamento `lazy` na galeria e `fetchpriority="high"` na imagem principal.
- **Boas práticas e segurança:** catálogo desacoplado em JavaScript (`obras.js`), manipulação segura de DOM (sem `innerHTML`), `Content-Security-Policy` via `<meta>`, links externos com `rel="noopener noreferrer"` e página `404.html` personalizada para o GitHub Pages.

### Estrutura de arquivos

```text
├── index.html              # Página principal do portfólio
├── 404.html                # Página de erro personalizada (GitHub Pages)
├── LICENSE                 # Licença MIT (código) + direitos reservados (obras)
├── .nojekyll               # Desativa processamento Jekyll no GitHub Pages
└── assets/
    ├── css/
    │   └── custom.css      # Identidade visual, acessibilidade e animações
    ├── js/
    │   ├── obras.js        # Catálogo estruturado das obras
    │   └── app.js          # Renderização, filtros, modal e interatividade
    └── img/
        ├── favicon/        # Ícones e site.webmanifest
        └── obras/          # Imagens das obras em WebP
```

### Tecnologias
- HTML5 semântico & ARIA
- CSS3 (Custom Properties, Grid/Flexbox, Media Queries)
- JavaScript Vanilla (ES6+)
- Bootstrap 5.3 (Grid, Navbar, Modal e Carousel)
- GitHub Pages

---

## Como Executar Localmente

Por ser um projeto estático, não há etapa de build. Você pode abrir com a extensão **Live Server** no VS Code ou iniciar um servidor local com **Node.js** (que também simula o fallback para `404.html`):

```powershell
node -e "const http=require('http'),fs=require('fs'),path=require('path');const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};http.createServer((req,res)=>{const p=path.join('.',req.url==='/'?'index.html':req.url.split('?')[0]);if(fs.existsSync(p)&&fs.statSync(p).isFile()){res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res);}else{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});fs.createReadStream('404.html').pipe(res);}}).listen(8080,()=>console.log('http://localhost:8080'));"
```

Acesse `http://localhost:8080` no navegador.

---

## Desenvolvedor

Desenvolvido por **José Davi** — [github.com/jdavi-sc](https://github.com/jdavi-sc/)

---

## Licença

O código-fonte deste projeto está licenciado sob a **MIT License**. Todas as obras de arte, fotografias e textos autorais pertencem exclusivamente a **Sarah Vithoria Farias** (**Todos os direitos reservados**). Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
