# 📋 AstraPanel System Requirements

## 🖥️ Development Environment (Your Laptop)

### Minimum Requirements:
- **OS:** Windows 10/11, macOS, or Linux
- **RAM:** 4GB (8GB recommended)
- **Storage:** 2GB free space
- **Node.js:** 18.x or 20.x
- **NPM:** 9.x or higher
- **Browser:** Chrome, Firefox, Edge (latest)

### Development Tools:
- VS Code (recommended)
- Git
- Terminal/PowerShell
- Postman (optional, for API testing)

---

## ☁️ Production VPS (Server)

### Minimum Specifications:
```
CPU:      1 Core (2 Cores recommended)
RAM:      1GB (2GB recommended for multiple sites)
Storage:  20GB SSD
Bandwidth: 1TB/month
OS:       Ubuntu 20.04 LTS or 22.04 LTS
```

### Recommended VPS Providers:

#### 1. DigitalOcean ($6/month)
- **Plan:** Basic Droplet
- **Specs:** 1GB RAM, 1 CPU, 25GB SSD
- **Bandwidth:** 1TB
- **URL:** digitalocean.com

#### 2. Vultr ($6/month)
- **Plan:** Regular Performance
- **Specs:** 1GB RAM, 1 CPU, 25GB SSD
- **Bandwidth:** 1TB
- **URL:** vultr.com

#### 3. Linode (Akamai) ($5/month)
- **Plan:** Nanode 1GB
- **Specs:** 1GB RAM, 1 CPU, 25GB SSD
- **Bandwidth:** 1TB
- **URL:** linode.com

#### 4. Hetzner ($4/month - Cheapest!)
- **Plan:** CX11
- **Specs:** 2GB RAM, 1 CPU, 20GB SSD
- **Bandwidth:** 20TB
- **URL:** hetzner.com

---

## 🌐 Network Requirements

### Ports to Open:
```
Port 22:  SSH (Administration)
Port 80:  HTTP (Web Traffic)
Port 443: HTTPS (Secure Web Traffic)
```

### Firewall Configuration:
```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

---

## 📦 Software Stack (Auto-installed by install.sh)

### Backend:
- **Node.js:** 20.x LTS
- **Express.js:** 5.x
- **SQLite3:** 5.x
- **PM2:** Latest (Process Manager)

### Frontend:
- **React:** 18.x
- **Vite:** 5.x
- **TailwindCSS:** 3.x

### Web Server:
- **Nginx:** Latest (Reverse Proxy)

### System Tools:
- Git
- Unzip
- Curl/Wget

---

## 💾 Disk Space Usage

### Per Website Hosted:
```
Static Website:    10-50 MB
PHP Website:       50-200 MB
Node.js App:       100-500 MB
Database + Backups: 50-500 MB
```

### Example Capacity (20GB VPS):
- **System Files:** ~3GB
- **AstraPanel:** ~200MB
- **Available for Sites:** ~16GB
- **Can Host:** 20-50 websites (depending on size)

---

## 🔒 Security Requirements

### SSH Access:
- SSH Key Authentication (recommended)
- Strong root password
- Disable password login (optional, advanced)

### SSL Certificates:
- Let's Encrypt (Free)
- Auto-renewal configured

### Firewall:
- UFW enabled
- Only required ports open

---

## 🌍 Domain Requirements (Optional)

### For Production:
- **Domain Name:** Any registrar (GoDaddy, Namecheap, Cloudflare)
- **DNS Configuration:** 
  - A Record pointing to VPS IP
  - TTL: 3600 (1 hour)

### Without Domain:
- Access via IP: `http://YOUR_VPS_IP`
- Works perfectly, but no SSL (HTTPS) without domain

---

## 📊 Performance Benchmarks

### Expected Load Capacity:

#### 1GB RAM VPS:
- **Concurrent Users:** 50-100
- **Websites:** 5-10 small sites
- **Daily Visits:** 1,000-5,000

#### 2GB RAM VPS:
- **Concurrent Users:** 100-200
- **Websites:** 10-20 sites
- **Daily Visits:** 5,000-10,000

#### 4GB RAM VPS:
- **Concurrent Users:** 200-500
- **Websites:** 20-50 sites
- **Daily Visits:** 10,000-50,000

---

## 🚀 Installation Time

### Local Development:
```
NPM Install (client): 2-5 minutes
NPM Install (server): 1-2 minutes
First Run:            Instant
Total:               3-7 minutes
```

### VPS Deployment:
```
System Update:        2-5 minutes
Node.js Install:      1-2 minutes
Dependencies:         3-5 minutes
Frontend Build:       2-3 minutes
PM2 + Nginx Setup:    1-2 minutes
Total:               9-17 minutes
```

---

## ✅ Compatibility Matrix

| Component | Version | Status |
|-----------|---------|--------|
| Node.js 18.x | ✅ | Supported |
| Node.js 20.x | ✅ | Recommended |
| Node.js 16.x | ⚠️ | Works (EOL) |
| Ubuntu 20.04 | ✅ | Supported |
| Ubuntu 22.04 | ✅ | Recommended |
| Ubuntu 24.04 | ✅ | Supported |
| Debian 11 | ⚠️ | Should work (untested) |
| CentOS/RHEL | ❌ | Not supported (use Ubuntu) |

---

## 🆘 Troubleshooting

### Not Enough RAM?
```bash
# Create swap file (temporary memory)
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Disk Space Full?
```bash
# Clean old logs
pm2 flush
sudo journalctl --vacuum-time=7d

# Remove old backups
find /opt/astrapanel/server/hosted_sites/*/backups -mtime +30 -delete
```

---

## 📈 Upgrade Path

### When to Upgrade VPS:

| Metric | Action |
|--------|--------|
| RAM > 80% | Upgrade to 2GB |
| CPU > 70% | Upgrade CPU cores |
| Disk > 85% | Upgrade storage |
| 100+ sites | Consider dedicated server |

---

**Last Updated:** Phase 4 - January 2026
