# cleanup.ps1 - PowerShell cleanup script for Windows

Write-Host "🧹 Cleaning up SocialCrafters repository..." -ForegroundColor Cyan

# Remove Python bytecode
Write-Host "Removing Python bytecode files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "__pycache__" -Directory | ForEach-Object { Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue }
Get-ChildItem -Path . -Recurse -Name "*.pyc" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "*.pyo" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove Node.js artifacts
Write-Host "Removing Node.js artifacts..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "node_modules" -Directory | ForEach-Object { Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue }
Get-ChildItem -Path . -Recurse -Name "npm-debug.log*" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "yarn-debug.log*" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "yarn-error.log*" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove build artifacts
Write-Host "Removing build artifacts..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "dist" -Directory | ForEach-Object { Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue }
Get-ChildItem -Path . -Recurse -Name "build" -Directory | ForEach-Object { Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue }
Get-ChildItem -Path . -Recurse -Name ".expo" -Directory | ForEach-Object { Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue }

# Remove database files
Write-Host "Removing development database files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "*.sqlite3" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "*.db" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove log files
Write-Host "Removing log files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "*.log" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove temporary files
Write-Host "Removing temporary files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name "*.tmp" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "*.temp" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "*.bak" | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove system files
Write-Host "Removing system files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Recurse -Name ".DS_Store" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path . -Recurse -Name "Thumbs.db" | Remove-Item -Force -ErrorAction SilentlyContinue

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
Write-Host "📋 Run 'git status' to verify no sensitive files are tracked." -ForegroundColor Cyan
