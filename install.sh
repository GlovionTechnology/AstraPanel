#!/bin/bash

#############################################
# AstraPanel Auto-Installer v1.0
# One-Command VPS Setup Script
# Usage: curl -fsSL astrapanel.com/install.sh | bash
#############################################

set -e  # Exit on any error

echo "========================================="
echo "  🚀 AstraPanel Auto-Installer"
echo "========================================="
echo ""

# --- 1. CHECK OS ---
echo "[1/8] Checking Operating System..."
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    if [ "$OS" != "ubuntu" ]; then
        echo "❌ Error: This script only supports Ubuntu (Detected: $OS)"
        exit 1
    fi
else
    echo "❌ Error: Cannot detect OS"
    exit 1
fi
echo "✅ Ubuntu Detected"
echo ""

# --- 2. UPDATE SYSTEM ---
echo "[2/8] Updating System Packages..."
sudo apt update -y && sudo apt upgrade -y
echo "✅ System Updated"
echo ""

# --- 3. INSTALL NODE.JS ---
echo "[3/8] Installing Node.js 20.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "Node.js already installed ($(node -v))"
fi
echo "✅ Node.js: $(node -v)"
echo "✅ NPM: $(npm -v)"
echo ""

# --- 4. INSTALL ESSENTIAL TOOLS ---
echo "[4/8] Installing Essential Tools (Git, Nginx, Unzip, PM2)..."
sudo apt install -y git nginx unzip

# Install PM2 globally (Process Manager)
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    echo "PM2 already installed"
fi
echo "✅ Tools Installed"
echo ""

# --- 5. DOWNLOAD ASTRAPANEL ---
echo "[5/8] Downloading AstraPanel from GitHub..."
INSTALL_DIR="/opt/astrapanel"

# Remove old installation if exists
if [ -d "$INSTALL_DIR" ]; then
    echo "⚠️  Existing installation found. Backing up..."
    sudo mv $INSTALL_DIR $INSTALL_DIR.backup.$(date +%s)
fi

# Clone repository
sudo git clone https://github.com/GlovionTechnology/AstraPanel.git $INSTALL_DIR
cd $INSTALL_DIR
echo "✅ Code Downloaded to $INSTALL_DIR"
echo ""

# --- 6. INSTALL DEPENDENCIES ---
echo "[6/8] Installing Dependencies..."

# Backend Dependencies
echo "📦 Installing Server Dependencies..."
cd $INSTALL_DIR/server
sudo npm install --production

# Frontend Build (if dist not present)
echo "📦 Building Frontend..."
cd $INSTALL_DIR/client
sudo npm install
sudo npm run build

# Database Initialization
echo "📦 Initializing Database..."
cd $INSTALL_DIR/server
sudo node init-db.js

echo "✅ Dependencies Installed & Frontend Built"
echo ""

# --- 7. SETUP PM2 (Auto-Restart) ---
echo "[7/8] Setting up PM2 Process Manager..."
cd $INSTALL_DIR/server

# Stop existing PM2 process if running
pm2 stop astrapanel 2>/dev/null || true
pm2 delete astrapanel 2>/dev/null || true

# Start AstraPanel with PM2
pm2 start index.js --name "astrapanel" --watch

# Auto-start PM2 on system reboot
pm2 startup systemd -u $USER --hp $HOME
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save

echo "✅ PM2 Configured (Process: astrapanel)"
echo ""

# --- 8. SETUP NGINX REVERSE PROXY ---
echo "[8/8] Configuring Nginx..."

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/astrapanel > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;  # Accept all domains (Change to your domain later)

    # Reverse Proxy to Node.js (Port 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Client Max Body Size (for file uploads)
    client_max_body_size 100M;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/astrapanel /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Remove default site

# Test & Restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Nginx Configured"
echo ""

# --- 9. FINAL OUTPUT ---
echo "========================================="
echo "  ✅ INSTALLATION COMPLETE!"
echo "========================================="
echo ""
echo "🌐 AstraPanel URL: http://$(curl -s ifconfig.me)"
echo "📂 Installation Path: $INSTALL_DIR"
echo ""
echo "🔧 Useful Commands:"
echo "   pm2 status         - Check server status"
echo "   pm2 logs astrapanel - View live logs"
echo "   pm2 restart astrapanel - Restart server"
echo ""
echo "🔐 Default Login:"
echo "   Username: admin"
echo "   Password: admin123"
echo "   (Change immediately after first login!)"
echo ""
echo "========================================="
