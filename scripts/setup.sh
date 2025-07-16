#!/bin/bash

# CSEDU Web Development Setup Script
# This script sets up the development environment for both Frontend and Backend

echo "🚀 Setting up CSEDU Web Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python is not installed. Please install Python 3.9+ first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "Python version: $(python3 --version)"

# Setup Backend
print_status "Setting up Backend..."
cd Backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from template..."
    cp .env .env.local
    print_warning "Please update .env.local with your configuration"
fi

# Initialize database
print_status "Initializing database..."
alembic upgrade head

print_status "Backend setup complete!"

# Setup Frontend
cd ../Frontend
print_status "Setting up Frontend..."

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install

print_status "Frontend setup complete!"

# Go back to root
cd ..

print_status "✅ Development environment setup complete!"
echo ""
echo "🎯 To start development:"
echo "  Backend:  cd Backend && source venv/bin/activate && python run.py"
echo "  Frontend: cd Frontend && npm run dev"
echo ""
echo "📚 Useful URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
