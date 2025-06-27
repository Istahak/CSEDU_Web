#!/bin/bash

# CSEDU Web Development Server Start Script

echo "🚀 Starting CSEDU Web Development Servers..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

# Kill any existing processes on our ports
print_status "Stopping any existing servers..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Start Backend in background
print_status "Starting Backend server..."
cd Backend
source venv/bin/activate 2>/dev/null || print_status "Virtual environment not found, using system Python"
python run.py &
BACKEND_PID=$!

# Start Frontend in background
print_status "Starting Frontend server..."
cd ../Frontend
npm run dev &
FRONTEND_PID=$!

# Go back to root
cd ..

print_status "✅ Development servers started!"
echo ""
echo "🌐 Application URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "📝 Process IDs:"
echo "  Backend PID:  $BACKEND_PID"
echo "  Frontend PID: $FRONTEND_PID"
echo ""
echo "🛑 To stop servers: ./scripts/stop.sh"
echo "   Or press Ctrl+C to stop this script"

# Function to cleanup on exit
cleanup() {
    echo ""
    print_status "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
