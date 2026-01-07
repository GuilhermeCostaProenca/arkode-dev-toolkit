# Arkode Dev Toolkit

Monorepo do Arkode Dev Toolkit, construído como um projeto de portfólio para demonstrar a visão de uma plataforma integrada de operações digitais. O foco é apresentar fluxos completos, UI refinada e dados simulados para testes e demonstrações.

## O que está pronto

- **Front-end completo** com jornadas de autenticação, workspace, projetos e módulos temáticos.
- **Dados simulados** para permitir navegação sem depender de back-end ativo.
- **Estrutura modular** pronta para evoluir integrações e serviços reais.

## Estrutura

- **Frontend** em `apps/web/` (React + Vite)
- **Backend** em `apps/api/` (FastAPI)
- **Infra** em `infra/` (Docker)

## Como executar

### Com Docker (Recomendado)

```bash
cd infra
docker compose up --build
```

### Desenvolvimento local

#### Frontend
```bash
cd apps/web
pnpm install
pnpm dev
```

#### Backend
```bash
cd apps/api
poetry install
uvicorn app.main:app --reload
```

## URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Database: localhost:5432
