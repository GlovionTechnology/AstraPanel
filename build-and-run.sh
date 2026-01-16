#!/bin/bash

#############################################
# AstraPanel - Production Build Script (Linux/Mac)
# Run this before deploying to test locally
#############################################

echo "========================================"
echo "  AstraPanel Production Builder"
echo "========================================"
echo ""

echo "[1/3] Building Frontend..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Frontend build failed!"
    exit 1
fi
echo "✅ DONE: Frontend built in client/dist"
echo ""

echo "[2/3] Installing Server Dependencies..."
cd ../server
npm install
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Server dependencies installation failed!"
    exit 1
fi
echo "✅ DONE: Server dependencies installed"
echo ""

echo "[3/3] Starting Production Server..."
echo ""
echo "========================================"
echo "  🚀 Production Server Starting..."
echo "  URL: http://localhost:3000"
echo "========================================"
echo ""
node index.js
