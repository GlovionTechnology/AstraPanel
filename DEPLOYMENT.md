# 🚀 AstraPanel - Deployment Guide

## Phase 4: Distribution & Deployment

### 📋 Prerequisites
- GitHub Account
- VPS Server (Ubuntu 20.04+ recommended)
- Domain (optional, can use IP initially)

---

## 🛠️ Step 1: Local Production Testing

### Build Frontend
```bash
cd client
npm run build
```
This creates `client/dist/` folder with optimized production files.

### Test Production Mode (Windows)
```bash
./build-and-run.bat
```

### Test Production Mode (Linux/Mac)
```bash
chmod +x build-and-run.sh
./build-and-run.sh
```

Visit: `http://localhost:3000` - Ab sirf **1 server** chal raha hai! ✅

---

## ☁️ Step 2: Push to GitHub

### Create Repository
1. Go to GitHub.com
2. Create New Repository: **AstraPanel-Core**
3. Set to **Private** (Security!)
4. Don't initialize with README

### Push Code
```bash
cd AstraPanel
git init
git add .
git commit -m "Phase 4: Production Ready - Full Stack Control Panel"
git branch -M main
git remote add origin https://github.com/GlovionTechnology/AstraPanel.git
git push -u origin main
```

---

## 🌐 Step 3: VPS Deployment

### A. Get VPS Server
- **Providers:** DigitalOcean, Vultr, Linode, AWS EC2
- **Minimum:** 1GB RAM, 1 CPU Core
- **OS:** Ubuntu 20.04 LTS or 22.04 LTS

### B. Run Installer on VPS
```bash
curl -fsSL https://raw.githubusercontent.com/GlovionTechnology/AstraPanel/main/install.sh | bash
```

Or manually:
```bash
wget https://raw.githubusercontent.com/GlovionTechnology/AstraPanel/main/install.sh
chmod +x install.sh
./install.sh
```

### D. Installation Process
The script will automatically:
1. ✅ Check Ubuntu OS
2. ✅ Update system packages
3. ✅ Install Node.js 20.x
4. ✅ Install Git, Nginx, PM2
5. ✅ Clone your repository
6. ✅ Install dependencies
7. ✅ Build frontend
8. ✅ Setup PM2 (auto-restart)
9. ✅ Configure Nginx (reverse proxy)

---

## 🔧 Post-Installation Commands

### Check Server Status
```bash
pm2 status
```

### View Live Logs
```bash
pm2 logs astrapanel
```

### Restart Server
```bash
pm2 restart astrapanel
```

### Stop Server
```bash
pm2 stop astrapanel
```

### Check Nginx Status
```bash
sudo systemctl status nginx
```

---

## 🔐 Default Credentials

**Username:** `admin`  
**Password:** `admin123`

**⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!**

---

## 🌍 Access Your Panel

**Via IP:**
```
http://YOUR_VPS_IP
```

**Via Domain (if configured):**
```
http://yourdomain.com
```

---

## 🛡️ Security Hardening (Recommended)

### 1. Setup Firewall
```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 2. Install SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 3. Change Default Admin Password
- Login to AstraPanel
- Go to Settings
- Update admin password

---

## 📁 File Structure on VPS

```
/opt/astrapanel/
├── client/
│   └── dist/          # Built frontend files
├── server/
│   ├── index.js       # Main server file
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── hosted_sites/  # Your websites
└── install.sh
```

---

## 🐛 Troubleshooting

### Server Not Starting
```bash
pm2 logs astrapanel
```

### Port Already in Use
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
pm2 restart astrapanel
```

### Nginx Errors
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔄 Updating AstraPanel

```bash
cd /opt/astrapanel
sudo git pull origin main
cd server && sudo npm install
cd ../client && sudo npm install && sudo npm run build
pm2 restart astrapanel
```

---

## 📞 Support

**Issues?** Open a GitHub Issue on your repository.

**Architecture:**
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + SQLite
- **Process Manager:** PM2
- **Web Server:** Nginx (Reverse Proxy)

---

**Built with ❤️ by Vikram Singh**
