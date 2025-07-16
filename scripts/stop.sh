#!/bin/bash

# CSEDU Web Development Server Stop Script

echo "🛑 Stopping CSEDU Web Development Servers..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Stop Backend server (port 8000)
print_status "Stopping Backend server (port 8000)..."
backend_pids=$(lsof -ti:8000)
if [ ! -z "$backend_pids" ]; then
    echo $backend_pids | xargs kill -9
    print_status "Backend server stopped"
else
    print_status "No Backend server running on port 8000"
fi

# Stop Frontend server (port 5173)
print_status "Stopping Frontend server (port 5173)..."
frontend_pids=$(lsof -ti:5173)
if [ ! -z "$frontend_pids" ]; then
    echo $frontend_pids | xargs kill -9
    print_status "Frontend server stopped"
else
    print_status "No Frontend server running on port 5173"
fi

# Kill any Node.js processes that might be hanging
print_status "Cleaning up any remaining processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "uvicorn" 2>/dev/null || true

print_status "✅ All servers stopped!"
