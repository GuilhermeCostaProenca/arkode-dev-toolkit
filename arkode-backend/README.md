# Arkode Backend

Backend API para o Arkode Dev Toolkit construído com FastAPI.

## Estrutura do Projeto

```
arkode-backend/
├── app/
│   ├── api/              # Rotas da API organizadas por módulo
│   ├── core/             # Configurações centrais e segurança
│   ├── db/               # Configuração do banco de dados
│   ├── models/           # Modelos ORM (SQLAlchemy)
│   ├── schemas/          # Esquemas Pydantic
│   ├── services/         # Lógica de domínio e serviços
│   ├── ml/               # Código relacionado a Machine Learning
│   └── main.py           # Ponto de entrada da aplicação
├── alembic/              # Migrations do banco de dados
├── tests/                # Testes
└── pyproject.toml        # Dependências do projeto
```

## Configuração

1. Instale as dependências:
```bash
poetry install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

3. Execute as migrações do banco:
```bash
alembic upgrade head
```

4. Execute o servidor:
```bash
uvicorn app.main:app --reload
```

## Endpoints

- `GET /` - Status da API
- `GET /health` - Health check
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/studio/` - Projetos do Studio
- `POST /api/orion/generate` - Geração de conteúdo com Orion AI
- `GET /api/agency/leads` - Leads da agência
- `GET /api/kb/articles` - Artigos da base de conhecimento
```

**13. Arquivos de teste básicos:**

```python:arkode-backend/tests/test_api/test_auth.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Arkode Backend API is running!"}

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}
```

```python:arkode-backend/tests/test_services/test_auth_service.py
import pytest
from app.services.auth_service import get_password_hash, verify_password

def test_password_hashing():
    password = "testpassword"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed)
    assert not verify_password("wrongpassword", hashed)
```

**14. Arquivos __init__.py para tornar as pastas em pacotes Python:**

```python:arkode-backend/app/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/api/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/core/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/db/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/models/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/schemas/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/services/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/app/ml/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/tests/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/tests/test_api/__init__.py
# Empty file to make this directory a Python package
```

```python:arkode-backend/tests/test_services/__init__.py
# Empty file to make this directory a Python package
```

Pronto! Criei toda a estrutura de pastas e arquivos do backend conforme você solicitou. A estrutura inclui:

✅ **Estrutura completa de pastas** seguindo exatamente o padrão que você especificou
✅ **Arquivos Python básicos** com exemplos funcionais para cada módulo
✅ **Configuração do FastAPI** com CORS e estrutura modular
✅ **Sistema de autenticação JWT** completo
✅ **Configuração do banco de dados** com SQLAlchemy
✅ **Schemas Pydantic** para validação de dados
✅ **Serviços** com lógica de negócio
✅ **Configuração do Alembic** para migrações
✅ **Arquivos de configuração** (pyproject.toml, .env.example)
✅ **Estrutura de testes** básica
✅ **Documentação** no README.md

Agora você pode:

1. **Navegar para a pasta do backend**: `cd arkode-backend`
2. **Instalar as dependências**: `poetry install`
3. **Configurar o arquivo .env** com suas credenciais
4. **Executar as migrações**: `alembic upgrade head`
5. **Iniciar o servidor**: `uvicorn app.main:app --reload`

A estrutura está pronta para desenvolvimento e pode ser expandida conforme suas necessidades específicas!
