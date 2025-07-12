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

#
## 🤖 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Simple Maps** - Mapas interativos
