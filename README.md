# Cypress E2E - Login Tests (OrangeHRM)

Este projeto contém testes automatizados E2E utilizando Cypress 15.x para validar o fluxo de login da aplicação OrangeHRM Demo.

## 🎯 Objetivo

Validar:

- Login com credenciais válidas
- Login com credenciais inválidas
- Status da requisição de autenticação
- Redirecionamentos corretos (via status 302)
- Elementos visuais da aplicação após autenticação

---

## 🛠️ Stack Utilizada

- Node.js
- Cypress 15.x
- VSCode
- Chrome
- Git Bash

---

## 📂 Estrutura do Projeto

```text
cypress/
├─ e2e/
│ └─ testloginorange.cy.js
├─ fixtures/
│ └─ exemples.json
├─ support/
│ └─ commands.js
│ └─ e2e.js
cypress.config.js
cypress.env.json
```
