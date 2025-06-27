# 🌐 CSEDU Web Application

A full-stack web application built with **React + Vite** frontend and **FastAPI** backend, designed for the Computer Science and Engineering Department of Dhaka University.

![Project Structure](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI-green)
![Database](https://img.shields.io/badge/Database-SQLite%20%2F%20PostgreSQL-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [🏗️ Project Structure](#️-project-structure)
- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🔧 Development Setup](#-development-setup)
- [📖 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🏗️ Project Structure

```
CSEDU_Web/
├── 🎨 Frontend/                   # React + Vite Application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── context/              # React Context for state
│   │   ├── services/             # API services
│   │   ├── utils/                # Utility functions
│   │   ├── constants/            # App constants
│   │   ├── styles/               # CSS files
│   │   └── assets/               # Static assets
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── 🚀 Backend/                    # FastAPI Application
│   ├── app/
│   │   ├── api/                  # API endpoints
│   │   ├── core/                 # Core functionality
│   │   ├── models/               # Database models
│   │   ├── schemas/              # Pydantic schemas
│   │   ├── crud/                 # Database operations
│   │   ├── services/             # Business logic
│   │   ├── utils/                # Utility functions
│   │   └── middleware/           # Custom middleware
│   ├── tests/                    # Test suite
│   ├── alembic/                  # Database migrations
│   ├── requirements.txt
│   └── run.py
│
├── 📋 Documentation/              # Project documentation
├── 🔧 Scripts/                   # Development scripts
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
└── LICENSE                       # Project license
```

## 🌟 Features

### 🎨 **Frontend Features**

- ⚡ **React 19** with **Vite** for fast development
- 🏗️ **Component-based architecture** with reusable UI components
- 🎣 **Custom hooks** for state management and API calls
- 🌐 **Context API** for global state management
- 📱 **Responsive design** with modern CSS
- 🔧 **API integration** with the FastAPI backend
- 🎯 **Clean folder structure** following React best practices

### 🚀 **Backend Features**

- 🔥 **FastAPI** with automatic OpenAPI documentation
- 🛡️ **JWT Authentication** with secure password hashing
- 🗄️ **SQLAlchemy ORM** with database migrations (Alembic)
- 📊 **RESTful API** with CRUD operations
- 🔒 **Security middleware** and CORS support
- 📧 **Email service** for notifications
- 🧪 **Comprehensive testing** with pytest
- 📝 **Request logging** and error handling

### 🏢 **Architecture Features**

- 🎯 **Clean Architecture** with separation of concerns
- 🔄 **Full-stack integration** between React and FastAPI
- 📈 **Scalable structure** for easy feature additions
- 🔧 **Environment-based configuration**
- 🐳 **Docker support** (optional)
- 📚 **Comprehensive documentation**

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+ and npm/yarn
- Python 3.9+
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/CSEDU_Web.git
cd CSEDU_Web
```

### **2. Setup Backend**

```bash
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
alembic upgrade head

# Run the backend server
python run.py
```

Backend will be available at: http://localhost:8000

### **3. Setup Frontend**

```bash
cd Frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

Frontend will be available at: http://localhost:5173

## 🔧 Development Setup

### **Backend Development**

```bash
cd Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run in development mode
python run.py

# Run tests
pytest

# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

### **Frontend Development**

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📖 API Documentation

### **Backend API Endpoints**

The FastAPI backend provides automatic interactive documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

### **Main API Routes**

#### **Authentication**

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/me` - Get current user

#### **Users**

- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create new user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

#### **Items**

- `GET /api/v1/items/` - List all items
- `POST /api/v1/items/` - Create new item
- `GET /api/v1/items/{item_id}` - Get item by ID
- `PUT /api/v1/items/{item_id}` - Update item
- `DELETE /api/v1/items/{item_id}` - Delete item

## 🧪 Testing

### **Backend Testing**

```bash
cd Backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_api.py -v
```

### **Frontend Testing**

```bash
cd Frontend

# Run tests (when configured)
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## 🚢 Deployment

### **Environment Variables**

#### **Backend (.env)**

```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
DEBUG=False
BACKEND_CORS_ORIGINS=["https://yourdomain.com"]
```

#### **Frontend**

```env
VITE_API_BASE_URL=https://your-api-domain.com
```

### **Production Deployment**

#### **Backend Deployment**

```bash
# Using Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Using Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

#### **Frontend Deployment**

```bash
# Build for production
npm run build

# Serve static files (dist/ folder)
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style and structure
- Write tests for new features
- Update documentation for significant changes
- Use meaningful commit messages
- Keep PRs focused and atomic

### **Code Style**

#### **Frontend**

- Use ESLint and Prettier for code formatting
- Follow React best practices
- Use functional components with hooks

#### **Backend**

- Follow PEP 8 style guidelines
- Use Black for code formatting
- Write docstrings for functions and classes
- Use type hints where appropriate

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project Maintainer**: [Your Name]
- **Email**: your.email@example.com
- **GitHub**: [Your GitHub Profile]

## 🙏 Acknowledgments

- Computer Science and Engineering Department, University of Dhaka
- FastAPI community for excellent documentation
- React and Vite teams for amazing developer experience
- All contributors who help improve this project

---

**Built with ❤️ for CSEDU**
