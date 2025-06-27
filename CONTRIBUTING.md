# Contributing to CSEDU Web

Thank you for your interest in contributing to the CSEDU Web project! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

- Be respectful and inclusive
- Be collaborative
- Be constructive
- Focus on the project goals

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/CSEDU_Web.git
   cd CSEDU_Web
   ```
3. **Set up the development environment**:
   - Follow the setup instructions in the main README.md
   - Set up both Frontend and Backend environments

## Development Process

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual feature branches
- `hotfix/hotfix-name` - Critical bug fixes

### Workflow

1. **Create a feature branch** from `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Write code following our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**:

   ```bash
   # Backend tests
   cd Backend && pytest

   # Frontend tests (when available)
   cd Frontend && npm test
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit messages:

   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Test additions/changes
   - `chore:` - Maintenance tasks

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Pull Request Process

1. **Ensure your PR**:

   - Has a clear title and description
   - References any related issues
   - Includes tests for new functionality
   - Updates documentation if needed
   - Follows our coding standards

2. **PR Requirements**:

   - All tests must pass
   - Code must be reviewed by at least one maintainer
   - No merge conflicts with the target branch

3. **Review Process**:
   - Maintainers will review your code
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

## Coding Standards

### Frontend (React + Vite)

- Use **ESLint** and **Prettier** for code formatting
- Follow **React best practices**:
  - Use functional components with hooks
  - Keep components small and focused
  - Use meaningful component and variable names
- **File naming**: Use PascalCase for components, camelCase for utilities
- **CSS**: Use CSS modules or styled-components, avoid global styles

### Backend (FastAPI)

- Follow **PEP 8** style guidelines
- Use **Black** for code formatting:
  ```bash
  black app/
  ```
- Use **isort** for import sorting:
  ```bash
  isort app/
  ```
- **Type hints**: Use type hints for function parameters and return values
- **Docstrings**: Write clear docstrings for all functions and classes
- **Error handling**: Use appropriate HTTP status codes and error messages

### General

- **Comments**: Write clear, concise comments for complex logic
- **Variable names**: Use descriptive names
- **Functions**: Keep functions small and focused on a single responsibility
- **Testing**: Write tests for new functionality

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** for solutions
3. **Try the latest version** to see if the issue is already fixed

### Creating a Good Issue

Include the following information:

- **Clear title** describing the issue
- **Environment details**: OS, browser, versions
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** or **error messages** if applicable
- **Additional context** that might be helpful

### Issue Templates

Use our issue templates for:

- 🐛 **Bug reports**
- ✨ **Feature requests**
- 📚 **Documentation improvements**
- ❓ **Questions**

## Development Setup

### Prerequisites

- Node.js 18+
- Python 3.9+
- Git

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd Backend
pip install -r requirements.txt
python run.py
```

## Testing

### Running Tests

```bash
# Backend tests
cd Backend
pytest

# Frontend tests (when available)
cd Frontend
npm test
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components
- Aim for good test coverage

## Documentation

- Update README.md for significant changes
- Add inline documentation for complex code
- Update API documentation for new endpoints
- Include examples in documentation

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the "question" label
- Contact the maintainers
- Check our documentation

Thank you for contributing to CSEDU Web! 🎉
