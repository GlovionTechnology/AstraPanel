# 🚀 AstraPanel - Web Hosting Control Panel

<div align="center">

![AstraPanel](https://img.shields.io/badge/AstraPanel-v1.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Modern, Fast, and Secure Web Hosting Control Panel**

Built with React, Node.js, Express, and SQLite

[Features](#-features) • [Installation](#-quick-installation) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📖 What is AstraPanel?

AstraPanel is a lightweight, modern web hosting control panel that allows you to manage multiple websites, domains, and hosting configurations from a single intuitive dashboard. Built from scratch with modern technologies, it's designed to be fast, secure, and easy to deploy.

### 🎯 Why AstraPanel?

- ✅ **One-Command Installation** - Deploy in 10 minutes
- ✅ **Modern UI** - Beautiful, responsive React interface
- ✅ **Lightweight** - Runs smoothly on 1GB RAM VPS
- ✅ **Secure** - JWT authentication, SSL ready
- ✅ **Open Source** - Fully customizable
- ✅ **Auto-Updates** - Built-in update mechanism
- ✅ **PM2 Powered** - Auto-restart on crashes
- ✅ **Nginx Integrated** - Production-ready reverse proxy

---

## ✨ Features

### 🖥️ Dashboard
- Real-time system monitoring (CPU, RAM, Disk usage)
- Server uptime tracking
- Quick stats overview
- Visual charts and graphs

### 🌐 Website Management
- Create unlimited websites
- Support for Static, PHP, and Node.js sites
- Domain management
- SSL certificate support
- One-click site deletion

### 🔐 Security
- JWT-based authentication
- Bcrypt password hashing
- Session management
- Secure API endpoints

### ⚙️ System Settings
- Server configuration
- User management
- Backup settings
- Environment variables

---

## 🚀 Quick Installation

### Prerequisites
- Ubuntu 20.04 or 22.04 VPS
- 1GB RAM minimum (2GB recommended)
- Root access

### One-Line Install
```bash
curl -fsSL https://raw.githubusercontent.com/GlovionTechnology/AstraPanel/main/install.sh | bash
```

### Manual Install
```bash
wget https://raw.githubusercontent.com/GlovionTechnology/AstraPanel/main/install.sh
chmod +x install.sh
./install.sh
```

Installation takes 10-15 minutes and includes:
- System updates
- Node.js 20.x installation
- Dependencies installation
- Frontend build
- PM2 process manager setup
- Nginx configuration

---

## 🔧 Post-Installation

### Access Your Panel
```
http://YOUR_VPS_IP
```

### Default Credentials
```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT:** Change the default password immediately after first login!

### Useful Commands
```bash
pm2 status                 # Check server status
pm2 logs astrapanel        # View live logs
pm2 restart astrapanel     # Restart server
sudo systemctl restart nginx  # Restart Nginx
```

---

## 📚 Documentation

- 📖 [Complete Deployment Guide](DEPLOYMENT.md)
- 📋 [Pre-Deployment Checklist](CHECKLIST.txt)
- 💻 [System Requirements](SYSTEM-REQUIREMENTS.md)
- 🔧 [Git Commands Reference](GIT_COMMANDS.txt)
- 🆘 [Troubleshooting Guide](TROUBLESHOOTING.md)

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js 20** - Runtime environment
- **Express 5** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **systeminformation** - System monitoring

### DevOps
- **PM2** - Process manager
- **Nginx** - Reverse proxy
- **Git** - Version control
- **Bash** - Automation scripts

---

## 📁 Project Structure

```
AstraPanel/
├── client/               # Frontend (React)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── api/         # Axios configuration
│   │   ├── hooks/       # Custom React hooks
│   │   └── utils/       # Helper functions
│   ├── dist/            # Production build (generated)
│   └── package.json
│
├── server/              # Backend (Node.js)
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Express middleware
│   ├── hosted_sites/    # Websites storage
│   ├── index.js         # Entry point
│   └── package.json
│
├── install.sh           # VPS auto-installer
├── update.sh            # Auto-update script
├── build-and-run.sh     # Local production test
└── .env.example         # Environment template
```

---

## 🖼️ Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x450?text=AstraPanel+Dashboard)

### Site Management
![Sites](https://via.placeholder.com/800x450?text=Website+Management)

### Settings
![Settings](https://via.placeholder.com/800x450?text=System+Settings)

---

## 🔄 Updating AstraPanel

```bash
cd /opt/astrapanel
./update.sh
```

The update script will:
1. Create automatic backup
2. Pull latest code from GitHub
3. Install dependencies
4. Rebuild frontend
5. Restart server

If update fails, automatic rollback is available.

---

## 🔒 Security Best Practices

### 1. Setup Firewall
```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 2. Install SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 3. Change Default Password
- Login to AstraPanel
- Go to Settings
- Update admin credentials

### 4. Regular Backups
Enable automated backups in Settings panel.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Known Issues

- SSL auto-renewal requires manual cron setup
- File upload limited to 100MB (configurable in Nginx)
- Email notifications not yet implemented

---

## 🗺️ Roadmap

- [ ] Multi-user support with roles
- [ ] File manager integration
- [ ] Database management (PHPMyAdmin)
- [ ] Email notifications
- [ ] Automated backups with retention policy
- [ ] Resource usage alerts
- [ ] Domain DNS management
- [ ] CDN integration
- [ ] Docker support
- [ ] API documentation

---

## 💡 Support

- **Issues:** [GitHub Issues](https://github.com/GlovionTechnology/AstraPanel/issues)
- **Documentation:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Email:** your-email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend
- TailwindCSS for beautiful styling
- PM2 for process management
- Nginx for reliable reverse proxy

---

## 📊 Stats

- **Lines of Code:** ~5,000+
- **Development Time:** 4 Phases
- **Technologies Used:** 15+
- **Dependencies:** 30+

---

## 🌟 Show Your Support

If you find AstraPanel useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code

---

<div align="center">

**Made with ❤️ by Vikram Singh**

[Report Bug](https://github.com/GlovionTechnology/AstraPanel/issues) • [Request Feature](https://github.com/GlovionTechnology/AstraPanel/issues)

</div>
