# 🎮 Pokédex Web

<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" width="200"/>
  
  **Uma Pokédex interativa desenvolvida com HTML, CSS e JavaScript puro**
  
  [![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)](LICENSE)
  [![Projeto de Estudo](https://img.shields.io/badge/projeto-estudo-green.svg)]()
</div>

---

## 📋 Objetivo do Projeto

Este projeto é uma **aplicação web educacional** que simula uma Pokédex, permitindo aos usuários pesquisar e visualizar informações detalhadas sobre diferentes Pokémon. Foi desenvolvido com o propósito de **aprendizado e prática de conceitos fundamentais de desenvolvimento web front-end**.

O projeto explora:
- Manipulação do DOM com JavaScript
- Consumo de APIs REST (PokéAPI)
- Estilização avançada com CSS puro
- Programação assíncrona com `async/await`
- Responsividade e experiência do usuário

> ⚠️ **Nota importante**: Este é um projeto para fins didáticos e experimentação, não destinado a ambientes de produção.

---

## 🎯 Problema Abordado

### Cenário Fictício

Imagine um treinador Pokémon que precisa de uma ferramenta rápida e visual para consultar informações sobre diferentes criaturas que encontra em suas jornadas. Ele precisa saber:

- Nome e número do Pokémon na Pokédex
- Tipos elementares (Fogo, Água, Grama, etc.)
- Características físicas (altura e peso)
- Estatísticas de batalha (HP, Ataque, Defesa, etc.)

### Solução Proposta

Uma interface web inspirada no visual clássico do Windows XP/98, que se conecta à [PokéAPI](https://pokeapi.co/) para buscar dados em tempo real sobre qualquer Pokémon usando seu nome ou número.

**Contexto de aprendizado**: Este exercício prático permite experimentar com:
- Integração com APIs públicas
- Design retrô e nostálgico
- Tratamento de diferentes tipos de dados e fallbacks
- Criação de barras de progresso dinâmicas
- Sistema de tipagem visual com cores

---

## 🛠️ Stack Utilizada

### Frontend
- **HTML5** - Estrutura semântica da aplicação
- **CSS3** - Estilização completa, incluindo:
  - Variáveis CSS para cores de tipos Pokémon
  - Design inspirado em Windows 98/XP
  - Layout responsivo com Flexbox
  - Barras de progresso animadas
- **JavaScript (ES6+)** - Lógica da aplicação:
  - Fetch API para requisições HTTP
  - Async/await para operações assíncronas
  - Manipulação do DOM
  - Event listeners

### API Externa
- **[PokéAPI](https://pokeapi.co/)** - Base de dados completa com informações sobre Pokémon

### Recursos Visuais
- Ícones de tipos Pokémon personalizados (PNG)
- Sprites animados da Geração V do jogo
- Fonte Roboto via Google Fonts

### Por que essas escolhas?

As tecnologias foram selecionadas para **explorar fundamentos do desenvolvimento web sem frameworks**, permitindo compreender melhor:
- Como funcionam requisições HTTP sem bibliotecas auxiliares
- Manipulação direta do DOM
- Estilização CSS avançada sem preprocessadores
- JavaScript vanilla moderno

---

## 🏗️ Decisões Técnicas

### 1. **Arquitetura de Código**

O projeto segue uma estrutura simples e direta:

```
pokedex/
├── index.html          # Estrutura da página
├── style.css           # Estilos e design
├── script.js           # Lógica da aplicação
├── colors.js           # Paleta de cores (não utilizado ativamente)
└── images/             # Assets visuais
    ├── bg.jpg          # Imagem de fundo
    └── [tipos].png     # Ícones dos tipos Pokémon
```

**Justificativa**: Para um projeto de estudo, manter todos os arquivos no mesmo nível facilita a navegação e compreensão do código.

### 2. **Sistema de Fallback para Imagens**

```javascript
const imageSources = [
    data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"],
    data["sprites"]["versions"]["generation-v"]["black-white"]["front_default"],
    // ... mais fallbacks
];
```

**Por quê?**: Garante que sempre haja uma imagem disponível, explorando diferentes endpoints da API e aprendendo sobre tratamento de dados ausentes.

### 3. **Conversão de Unidades**

```javascript
function roundHeight(decimeters) {
    var meters = decimeters * 0.1;
    return meters.toFixed(2);
}
```

**Por quê?**: A PokéAPI retorna altura em decímetros e peso em hectogramas. Convertemos para metros e quilogramas para melhor compreensão do usuário.

### 4. **Normalização de Entrada**

```javascript
renderPokemon(search.value.toLowerCase());
```

**Por quê?**: A API é case-sensitive, então convertemos a busca para minúsculas, ensinando sobre normalização de dados de entrada.

### 5. **Barras de Progresso Dinâmicas**

```javascript
statHpBar.style.width = `${(hpValue / maxStatValue) * 100}%`;
```

**Por quê?**: Utiliza o valor máximo teórico de stats (255) para calcular porcentagens proporcionais, criando uma visualização consistente.

### 6. **Tratamento de Tipos Duplos**

O código verifica se o Pokémon possui um ou dois tipos e ajusta a interface dinamicamente, ocultando o segundo tipo quando não existe.

**Por quê?**: Explora condicionais e manipulação de classes CSS baseada em dados da API.

### 7. **Design Retrô**

Utiliza bordas 3D, cores e estilo inspirados no Windows 98/XP:

```css
border: 3px solid;
border-color: #dfdfdf #0831d9 #0831d9 #dfdfdf;
```

**Por quê?**: Além de praticar CSS, cria uma experiência nostálgica e divertida.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexão com a internet (para acessar a PokéAPI)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/icastelito/pokedex.git
cd pokedex
```

2. **Abra o projeto**

Você pode simplesmente abrir o arquivo `index.html` diretamente no navegador, ou usar um servidor local:

**Opção 1: Abrir diretamente**
```bash
# No Windows (PowerShell)
start index.html
```

**Opção 2: Live Server (Recomendado)**

Se você usa VS Code, instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique com o botão direito em `index.html` → "Open with Live Server".

**Opção 3: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Acesse http://localhost:8000
```

**Opção 4: Node.js HTTP Server**
```bash
npx http-server
```

### Uso

1. Ao abrir a página, o Bulbasaur (#001) será carregado automaticamente
2. Digite o **nome** ou **número** de um Pokémon na barra de pesquisa
3. Pressione Enter ou clique fora do campo
4. Explore as informações exibidas!

### Exemplos de Pesquisa

- Por número: `25`, `1`, `150`
- Por nome: `pikachu`, `charizard`, `mewtwo`

> **Nota**: A pesquisa aceita apenas Pokémon da geração disponível na PokéAPI (atualmente até a Geração IX).

### Variáveis de Ambiente

Este projeto **não requer** variáveis de ambiente, pois utiliza a PokéAPI pública sem necessidade de autenticação.

### Simplificações

⚠️ Como este é um projeto didático, algumas simplificações foram feitas:

- Sem tratamento robusto de erros de rede
- Sem cache de requisições
- Sem testes automatizados
- Sem build process ou otimizações de produção
- Sem acessibilidade completa (ARIA labels, navegação por teclado)

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Este é um projeto de aprendizado, então sinta-se à vontade para experimentar.

### Guidelines

1. **Fork o projeto**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Faça commit das suas mudanças**
   ```bash
   git commit -m 'feat: Adiciona minha nova feature'
   ```
4. **Push para a branch**
   ```bash
   git push origin feature/minha-feature
   ```
5. **Abra um Pull Request**

### Padrões de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Adição de testes
- `chore:` Tarefas de manutenção

### Próximos Passos para Implementação

- [ ] Adicionar navegação com botões Anterior/Próximo
- [ ] Implementar busca por tipo
- [ ] Adicionar animações de transição
- [ ] Melhorar responsividade mobile
- [ ] Adicionar modo escuro
- [ ] Implementar cache de requisições
- [ ] Adicionar informações de evoluções
- [ ] Traduzir nomes e descrições para português

---

## 📚 Contexto de Estudo

Este repositório foi criado como **projeto de aprendizado** para explorar e praticar conceitos de desenvolvimento web front-end. O objetivo principal é:

✅ Praticar JavaScript vanilla moderno  
✅ Aprender a consumir APIs REST  
✅ Experimentar com CSS avançado  
✅ Compreender manipulação do DOM  
✅ Desenvolver uma interface de usuário interativa  

### Aprendizados Principais

Durante o desenvolvimento deste projeto, os seguintes conceitos foram explorados:

- **Programação Assíncrona**: Uso de `async/await` e Promises
- **Fetch API**: Requisições HTTP sem bibliotecas externas
- **Manipulação DOM**: Query selectors, eventos e atualização dinâmica
- **CSS Moderno**: Variáveis CSS, Flexbox, pseudo-classes
- **Tratamento de Dados**: Conversões, validações e fallbacks
- **UX/UI**: Design visual e feedback para o usuário

### Limitações Conhecidas

⚠️ **Atenção**: Este projeto pode conter decisões que não são ideais para ambientes de produção:

- Sem gerenciamento de estado robusto
- Sem tratamento abrangente de erros
- Sem otimização de performance
- Sem testes unitários ou e2e
- Sem preocupação com SEO
- Acessibilidade limitada

**Estas limitações são intencionais**, pois o foco está em aprender os fundamentos antes de adicionar camadas de complexidade.

---

## 📄 Licença

Este projeto está sob a licença MIT. 

```
MIT License

Copyright (c) 2025 Icaro Castelo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### ⚠️ Aviso Importante

**Este é um projeto educacional e não deve ser considerado pronto para uso em produção.** Foi desenvolvido para fins de aprendizado e experimentação com tecnologias web.

---

## 🙏 Agradecimentos

- [PokéAPI](https://pokeapi.co/) - Pela API incrível e gratuita
- Nintendo/Game Freak/The Pokémon Company - Pelos Pokémon
- Comunidade de desenvolvedores - Por compartilhar conhecimento

---

## 📞 Contato

**Icaro Castelo**

- GitHub: [@icastelito](https://github.com/icastelito)
- LinkedIn: [Icaro Castelo](https://www.linkedin.com/in/icastelob/)

---

<div align="center">
  <p>Feito com ☕ para aprendizado</p>
  <p>⭐ Se este projeto te ajudou a aprender algo novo, considere dar uma estrela!</p>
</div>
