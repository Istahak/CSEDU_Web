# CSEDU Web Backend API

A well-structured FastAPI backend application with authentication, database management, and comprehensive features.

## 📁 Project Structure

```
Backend/
├── 🚀 **app/**                    # Main application package
│   ├── api/                       # API layer
│   │   ├── endpoints/             # API endpoints
│   │   │   ├── auth.py           # Authentication endpoints
│   │   │   ├── users.py          # User management endpoints
│   │   │   └── items.py          # Item management endpoints
│   │   └── api.py                # API router configuration
│   │
│   ├── core/                     # Core functionality
│   │   ├── config.py             # Application configuration
│   │   ├── database.py           # Database configuration
│   │   └── security.py           # Security utilities
│   │
│   ├── models/                   # SQLAlchemy models
│   │   ├── user.py               # User model
│   │   └── item.py               # Item model
│   │
│   ├── schemas/                  # Pydantic schemas
│   │   ├── auth.py               # Authentication schemas
│   │   ├── user.py               # User schemas
│   │   └── item.py               # Item schemas
│   │
│   ├── crud/                     # Database operations
│   │   ├── user.py               # User CRUD operations
│   │   └── item.py               # Item CRUD operations
│   │
│   ├── services/                 # Business logic services
│   │   └── email.py              # Email service
│   │
│   ├── utils/                    # Utility functions
│   │   └── helpers.py            # Helper functions
│   │
│   ├── middleware/               # Custom middleware
│   │   └── logging.py            # Request logging middleware
│   │
│   └── main.py                   # FastAPI application entry point
│
├── 🧪 **tests/**                 # Test files
│   ├── conftest.py               # Test configuration
│   └── test_api.py               # API tests
│
├── 📊 **alembic/**               # Database migrations
│   └── env.py                    # Alembic environment
│
├── requirements.txt              # Python dependencies
├── alembic.ini                  # Alembic configuration
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
└── run.py                       # Application runner
```

## 🌟 Features

### **Core Features**

- ✅ **FastAPI** - Modern, fast web framework
- ✅ **SQLAlchemy** - Database ORM with async support
- ✅ **Alembic** - Database migrations
- ✅ **Pydantic** - Data validation and serialization
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - Bcrypt password security
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Request Logging** - Comprehensive request/response logging
- ✅ **API Documentation** - Auto-generated OpenAPI docs

### **Architecture Features**

- 🏗️ **Clean Architecture** - Separation of concerns
- 📝 **CRUD Operations** - Create, Read, Update, Delete
- 🛡️ **Security Middleware** - Request validation and security
- 📧 **Email Service** - Notification system
- 🧪 **Testing Suite** - Unit and integration tests
- 🔧 **Configuration Management** - Environment-based settings

## 🚀 Quick Start

### **1. Install Dependencies**

```bash
cd Backend
pip install -r requirements.txt
```

### **2. Configure Environment**

Copy `.env` file and update with your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL=sqlite:///./csedu_web.db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### **3. Initialize Database**

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### **4. Run the Application**

```bash
# Development server
python run.py

# Or using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **5. Access the API**

- **API Base**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## 📚 API Endpoints

### **Authentication**

- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/register` - Register new user
- `GET /api/v1/auth/me` - Get current user

### **Users**

- `GET /api/v1/users/` - List users
- `POST /api/v1/users/` - Create user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

### **Items**

- `GET /api/v1/items/` - List items
- `POST /api/v1/items/` - Create item
- `GET /api/v1/items/{item_id}` - Get item by ID
- `PUT /api/v1/items/{item_id}` - Update item
- `DELETE /api/v1/items/{item_id}` - Delete item

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_api.py
```

## 🔧 Development

### **Database Operations**

```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Downgrade migration
alembic downgrade -1
```

### **Code Quality**

```bash
# Format code
black app/

# Sort imports
isort app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

## 🐳 Docker Support (Optional)

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 📝 Environment Variables

| Variable                      | Description             | Default                    |
| ----------------------------- | ----------------------- | -------------------------- |
| `DATABASE_URL`                | Database connection URL | `sqlite:///./csedu_web.db` |
| `SECRET_KEY`                  | JWT secret key          | **Required**               |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time   | `30`                       |
| `DEBUG`                       | Debug mode              | `False`                    |
| `BACKEND_CORS_ORIGINS`        | Allowed CORS origins    | `[]`                       |

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for password security
- **CORS Protection** - Configurable cross-origin access
- **Request Validation** - Pydantic schema validation
- **SQL Injection Protection** - SQLAlchemy ORM protection

## 📖 Documentation

- FastAPI automatically generates interactive API documentation
- Access at `/docs` for Swagger UI
- Access at `/redoc` for ReDoc interface
- OpenAPI schema available at `/openapi.json`

This backend provides a solid foundation for your CSEDU Web application with modern Python web development practices! 🎯
