# 🛡️ Mapa de Conferências de Segurança da Informação no Brasil

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 📖 Sobre o Projeto

O **Mapa de Conferências de Segurança da Informação no Brasil** é uma plataforma interativa que centraliza informações sobre eventos, conferências e meetups de cybersecurity realizados em território nacional.

### 🎯 Objetivos

- **Centralizar** informações sobre eventos de segurança da informação
- **Facilitar** a descoberta de conferências por região/estado
- **Conectar** a comunidade de segurança brasileira
- **Promover** o conhecimento e networking na área

### ✨ Funcionalidades

- 🗺️ **Mapa interativo** do Brasil com eventos por estado
- 🔍 **Busca e filtros** por nome, estado e região
- 📅 **Calendário** de eventos com datas e informações
- 🔗 **Links diretos** para sites dos eventos e redes sociais
- 📱 **Interface responsiva** e moderna

## 🤝 Como Contribuir

### Adicionando Novos Eventos

A principal forma de contribuir é adicionando novos eventos ao arquivo `src/data/events.json`. Siga os passos:

1. **Fork** este repositório
2. **Clone** seu fork localmente
3. **Edite** o arquivo `src/data/events.json`
4. **Adicione** seu evento seguindo a estrutura abaixo
5. **Faça** um Pull Request

### 📝 Estrutura do Evento

```json
{
  "name": "Nome da Conferência",
  "date": "2025-12",
  "approximate": false,
  "city": "São Paulo",
  "state": "SP",
  "url": "https://exemplo.com.br",
  "tags": ["hacking", "pesquisa", "general"],
  "description": "Descrição detalhada do evento...",
  "socials": {
    "twitter": "https://twitter.com/evento",
    "telegram": "https://t.me/evento",
    "instagram": "https://instagram.com/evento"
  },
  "price": "R$ 100-200"
}
```

### 📋 Campos Obrigatórios

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `name` | Nome do evento | `"BSides São Paulo"` |
| `date` | Ano e mês (YYYY-MM) | `"2025-09"` |
| `city` | Cidade | `"São Paulo"` |
| `state` | Sigla do estado | `"SP"` |
| `url` | Site oficial | `"https://bsides.com.br"` |
| `price` | Faixa de preço | `"Gratuito"` ou `"R$ 50-100"` |

### 📋 Campos Opcionais

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `approximate` | Data aproximada | `true` ou `false` |
| `description` | Descrição detalhada | `"Conferência focada em..."` |
| `tags` | Categorias | `["hacking", "ctf", "general"]` |
| `socials` | Redes sociais | Ver estrutura acima |

### 🏷️ Tags Disponíveis

- `general` - Eventos gerais de segurança
- `hacking` - Focado em hacking/pentest
- `pesquisa` - Pesquisa acadêmica
- `ctf` - Capture The Flag
- `forensics` - Forense digital
- `privacy` - Privacidade e proteção de dados
- `enterprise` - Segurança corporativa

## 🚀 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mapa-sec-conf-br.git

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 📄 Exemplo de Contribuição

```json
{
  "name": "Security BSides São Paulo 2025",
  "date": "2025-08",
  "approximate": false,
  "city": "São Paulo",
  "state": "SP",
  "url": "https://bsides.com.br",
  "tags": ["general", "hacking"],
  "description": "O Security BSides é uma conferência comunitária que reúne profissionais de segurança da informação para compartilhar conhecimento e networking.",
  "socials": {
    "twitter": "https://twitter.com/bsidessp",
    "telegram": "https://t.me/bsidessp"
  },
  "price": "R$ 50-80"
}
```

## 🤖 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Simple Maps** - Mapas interativos

## 📞 Contato

- 🐦 Twitter: [@hackhere](https://twitter.com/hackhere)
- 📧 Email: contato@hackhere.com.br
- 💬 Telegram: [Canal HackHere](https://t.me/hackhere)

---

<div align="center">
  Feito com ❤️ pela comunidade brasileira de segurança da informação
</div>
