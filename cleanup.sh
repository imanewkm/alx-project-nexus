#!/bin/bash
# cleanup.sh - Remove sensitive files and artifacts

echo "🧹 Cleaning up SocialCrafters repository..."

# Remove Python bytecode
echo "Removing Python bytecode files..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -name "*.pyc" -delete 2>/dev/null || true
find . -name "*.pyo" -delete 2>/dev/null || true

# Remove Node.js artifacts
echo "Removing Node.js artifacts..."
find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "npm-debug.log*" -delete 2>/dev/null || true
find . -name "yarn-debug.log*" -delete 2>/dev/null || true
find . -name "yarn-error.log*" -delete 2>/dev/null || true

# Remove build artifacts
echo "Removing build artifacts..."
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".expo" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove database files
echo "Removing development database files..."
find . -name "*.sqlite3" -delete 2>/dev/null || true
find . -name "*.db" -delete 2>/dev/null || true

# Remove log files
echo "Removing log files..."
find . -name "*.log" -delete 2>/dev/null || true

# Remove temporary files
echo "Removing temporary files..."
find . -name "*.tmp" -delete 2>/dev/null || true
find . -name "*.temp" -delete 2>/dev/null || true
find . -name "*.bak" -delete 2>/dev/null || true
find . -name "*~" -delete 2>/dev/null || true

# Remove system files
echo "Removing system files..."
find . -name ".DS_Store" -delete 2>/dev/null || true
find . -name "Thumbs.db" -delete 2>/dev/null || true

echo "✅ Cleanup completed!"
echo "📋 Run 'git status' to verify no sensitive files are tracked."
