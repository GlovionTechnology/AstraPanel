#!/bin/bash

#############################################
# AstraPanel Auto-Update Script
# Updates AstraPanel to latest version from GitHub
# Usage: ./update.sh
#############################################

set -e

echo "========================================="
echo "  🔄 AstraPanel Auto-Updater"
echo "========================================="
echo ""

INSTALL_DIR="/opt/astrapanel"

# Check if AstraPanel is installed
if [ ! -d "$INSTALL_DIR" ]; then
    echo "❌ Error: AstraPanel not found at $INSTALL_DIR"
    echo "Please run the installer first!"
    exit 1
fi

cd $INSTALL_DIR

echo "[1/6] Creating backup..."
BACKUP_DIR="${INSTALL_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
sudo cp -r $INSTALL_DIR $BACKUP_DIR
echo "✅ Backup created at: $BACKUP_DIR"
echo ""

echo "[2/6] Stopping AstraPanel..."
pm2 stop astrapanel || true
echo "✅ Server stopped"
echo ""

echo "[3/6] Pulling latest code from GitHub..."
sudo git fetch origin
sudo git reset --hard origin/main
echo "✅ Code updated"
echo ""

echo "[4/6] Installing server dependencies..."
cd server
sudo npm install --production
echo "✅ Server dependencies updated"
echo ""

echo "[5/6] Building frontend..."
cd ../client
sudo npm install
sudo npm run build
echo "✅ Frontend rebuilt"
echo ""

echo "[6/6] Restarting AstraPanel..."
pm2 restart astrapanel
pm2 save
echo "✅ Server restarted"
echo ""

echo "========================================="
echo "  ✅ UPDATE COMPLETE!"
echo "========================================="
echo ""
echo "🌐 AstraPanel URL: http://$(curl -s ifconfig.me)"
echo "📂 Backup Location: $BACKUP_DIR"
echo ""
echo "🔧 Useful Commands:"
echo "   pm2 logs astrapanel - View logs"
echo "   pm2 status         - Check status"
echo ""
echo "⚠️  If something went wrong:"
echo "   sudo rm -rf $INSTALL_DIR"
echo "   sudo mv $BACKUP_DIR $INSTALL_DIR"
echo "   pm2 restart astrapanel"
echo ""
echo "========================================="
