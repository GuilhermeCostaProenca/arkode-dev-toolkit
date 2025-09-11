# Arkode Dev Toolkit

Monorepo para o Arkode Dev Toolkit com frontend e backend separados.

## Estrutura

- **Frontend** em `web/` (Lovable)
- **Backend** em `arkode-backend/` (FastAPI)

## Como executar

### Com Docker (Recomendado)

```bash
cd infra
docker compose up --build
```

### Desenvolvimento local

#### Frontend
```bash
cd web
npm install
npm run dev
```

#### Backend
```bash
cd arkode-backend
poetry install
uvicorn app.main:app --reload
```

## URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Database: localhost:5432