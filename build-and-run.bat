@echo off
REM ========================================
REM AstraPanel - Production Build Script (Windows)
REM Run this before deploying to test locally
REM ========================================

echo ========================================
echo   AstraPanel Production Builder
echo ========================================
echo.

echo [1/3] Building Frontend...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
echo DONE: Frontend built in client/dist
echo.

echo [2/3] Installing Server Dependencies...
cd ..\server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Server dependencies installation failed!
    pause
    exit /b 1
)
echo DONE: Server dependencies installed
echo.

echo [3/3] Starting Production Server...
echo.
echo ========================================
echo   Production Server Starting...
echo   URL: http://localhost:3000
echo ========================================
echo.
node index.js
