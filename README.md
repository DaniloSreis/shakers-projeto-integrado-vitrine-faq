<div align="center">

# 🛍️ shakers-projeto-integrado-vitrine-faq

**Solução de vitrine e PDP customizada para Shopify**  
Desafio Final da capacitação Shakers

<br/>

![Shopify](https://img.shields.io/badge/Shopify-Theme-blue?logo=shopify&logoColor=white&color=7AB55C)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Liquid](https://img.shields.io/badge/Liquid-Template-orange?color=purple)

</div>

## ✨ Visão Geral do Projeto

Este projeto implementa uma **experiência de vitrine e página de produto (PDP)**

### Principais funcionalidades implementadas

- **Página Inicial (Home) totalmente editável**  
  Hero Slider + Listagem de Coleções

- **Página de Produto (PDP) dinâmica**  
  Título, preço, imagens, descrição, variantes e botão de compra

- **Seção FAQ dinâmica por produto**  
  Utiliza **Metaobjetos** + **Metafields** (lista) para gerenciar perguntas e respostas diretamente no produto

- **Carrinho**  
  Adição de itens ao carrinho de compras

<br/>

## 📂 Estrutura do Projeto

```text
.
├── assets/
│   ├── cart-api.js
│   ├── collection.css
│   ├── components.css
│   ├── global.css
│   ├── header.css
│   ├── hero.css
│   ├── main-product.css
│   ├── main-product.js
│   ├── minius.svg
│   ├── plus.svg
│   ├── product-faq.css
│   ├── product-faq.js
│   ├── reset.css
│   ├── shopping-bag.svg
│   └── slider.js
│
├── config/
│   ├── settings_data.json
│   └── settings_schema.json
│
├── layout/
│   └── theme.liquid
│
├── sections/
│   ├── collection-product-list.liquid
│   ├── header-navigation.liquid
│   ├── hero-slider.liquid
│   ├── main-product.liquid
│   └── product-faq.liquid
│
├── snippets/
│   └── cart-drawer.liquid
│
├── templates/
│   ├── gift_card.liquid
│   ├── index.json
│   └── product.json
│
└── README.md
```

## 🚀 Como Testar Localmente (Shopify CLI)

1. **Pré-requisitos**
   Ter o [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) instalado

2. **Clone o repostório**

```bash
  git clone https://github.com/SEU_USUARIO/shakers-projeto-integrado-vitrine-faq.git
  cd shakers-projeto-integrado-vitrine-faq
```

3. **Faça login na sua loja**

```bash
shopify login
```

4. Inicie o servidor de desenvovlimento

```bash
shopify theme dev
```

## ⚙️ Configuração no Admin da Shopify

### 1. Criar o Metaobjeto para FAQ

- Vá em Configurações → Dados personalizados → Metaobjetos
- Crie um novo metaobjeto chamado `faq_item`
  Adicione os campos:
- `pergunta` → Single line text
- `resposta` → Multi-line text

### 2. Criar o Metafield no Produto

- Vá em **Configurações → Dados personalizados → Produtos**
- Clique em **Adicionar** definição
- **Nome:** FAQ List
- **Namespace e chave:** custom.faq_list
- **Tipo:** Metaobject → marque **"Lista de entradas"**
- Referencie o metaobjeto `faq_item`

### 3. Preencher no Produto

- Abra qualquer produto
- Na seção de **Metafields** adicione 3 ou mais itens FAQ (pergunta + resposta)

## 🎯 Links de Entrega

| Tipo | Descrição | Link |
|:----:|-----------|------|
| 📁 | Repositório do projeto | [Acessar →](https://github.com/DaniloSreis/shakers-projeto-integrado-vitrine-faq) |
| 🔗 | Pull Request (entrega) | [Ver PR →](https://github.com/DaniloSreis/shakers-projeto-integrado-vitrine-faq/pull/18) |
| ▶️ | Vídeo de apresentação (demo) | [Assistir →](https://youtu.be/0GHqqeiVMSM) |
