# 🔒 AstraPanel Security Architecture

## Environment Variables & Secret Management

### ✅ **The Professional Flow**

This document explains how AstraPanel handles sensitive data (JWT secrets, passwords) securely.

---

## 🎯 **Core Principle**

**Never commit secrets to GitHub!**

Instead:
- ✅ Commit code logic (how to use secrets)
- ✅ Commit templates (`.env.example`)
- ❌ Never commit actual secrets (`.env`)

---

## 🔐 **JWT Secret Management**

### **Development (Your Laptop)**

```javascript
// Code uses environment variable with fallback
const SECRET_KEY = process.env.JWT_SECRET || "DevFallbackSecret_ChangeInProduction";
```

**Local Setup:**
1. Copy template: `cp .env.example .env`
2. Generate secret: `openssl rand -base64 32`
3. Update `.env` file with generated secret

### **Production (VPS)**

**Automatic during installation!** 🎉

When you run `install.sh`, it automatically:
1. Generates a **unique random secret** (never on GitHub)
2. Creates `.env` file on VPS
3. Each installation gets a **different secret**

```bash
# Inside install.sh (auto-runs on VPS)
JWT_SECRET=$(openssl rand -base64 32)
cat > /opt/astrapanel/server/.env <<EOF
JWT_SECRET=$JWT_SECRET
EOF
```

---

## 📁 **File Structure**

```
AstraPanel/
├── .env.example        ✅ Committed to GitHub (Template)
├── .env                ❌ NOT on GitHub (.gitignore blocks it)
│   └── Contains: JWT_SECRET=ActualRandomSecret123
└── server/
    ├── middleware/
    │   └── authMiddleware.js  ✅ Uses process.env.JWT_SECRET
    └── controllers/
        └── authController.js  ✅ Uses process.env.JWT_SECRET
```

---

## 🛡️ **Security Benefits**

### **1. GitHub Hack Protection**
- Even if someone hacks your GitHub, they only get:
  - Code logic (public anyway)
  - Template file (`.env.example`)
- They **CANNOT** get:
  - User's actual JWT secrets
  - Production database passwords

### **2. Unique Secrets Per Installation**
- **Your VPS:** `JWT_SECRET=abc123xyz`
- **User's VPS:** `JWT_SECRET=def456uvw`
- **Different secrets = isolated security**

### **3. No Manual Configuration**
- Users don't need to:
  - Generate secrets manually
  - Edit configuration files
  - Understand security concepts
- `install.sh` does everything automatically!

---

## 🔄 **Installation Flow**

```
┌─────────────────────────────────────────┐
│ GitHub Repository                       │
│ ├── Code (logic)                ✅      │
│ ├── .env.example (template)    ✅      │
│ └── .env (actual secrets)      ❌      │
└─────────────────────────────────────────┘
              │
              │ git clone
              ↓
┌─────────────────────────────────────────┐
│ VPS Server                              │
│ 1. Code downloaded          ✅          │
│ 2. install.sh runs          ✅          │
│ 3. Generates JWT_SECRET     ✅          │
│    (openssl rand -base64 32)            │
│ 4. Creates .env file        ✅          │
│ 5. Server starts            ✅          │
│    Reads process.env.JWT_SECRET         │
└─────────────────────────────────────────┘
```

---

## 🧪 **Testing Locally**

### **Step 1: Setup Environment**
```bash
cd AstraPanel
cp .env.example .env
```

### **Step 2: Generate Secret**
```bash
# Generate random secret
openssl rand -base64 32
```

### **Step 3: Update .env**
```env
JWT_SECRET=paste_generated_secret_here
```

### **Step 4: Run Server**
```bash
cd server
node index.js
```

Server will read `JWT_SECRET` from `.env` file!

---

## 📋 **What Goes Where?**

| Item | GitHub | Local .env | VPS .env |
|------|--------|-----------|----------|
| **Code Logic** | ✅ Yes | - | - |
| **.env.example** | ✅ Yes | - | - |
| **.env file** | ❌ No | ✅ Yes | ✅ Yes |
| **JWT Secret** | ❌ Never | ✅ Manual | ✅ Auto-generated |

---

## 🔧 **Manual Secret Generation (Optional)**

If you need to generate secrets manually:

### **Linux/Mac:**
```bash
openssl rand -base64 32
```

### **Windows (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### **Node.js:**
```javascript
require('crypto').randomBytes(32).toString('base64')
```

---

## ⚠️ **Important Rules**

### ✅ **DO:**
- Use environment variables (`process.env.JWT_SECRET`)
- Commit `.env.example` template
- Add `.env` to `.gitignore`
- Auto-generate secrets in `install.sh`

### ❌ **DON'T:**
- Hardcode secrets in code
- Commit `.env` file to Git
- Share `.env` files publicly
- Use weak/predictable secrets

---

## 🆘 **Troubleshooting**

### **"JWT Secret not found" Error**

**Development:**
```bash
# Check if .env exists
ls -la | grep .env

# Create if missing
cp .env.example .env

# Generate and add secret
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
```

**Production (VPS):**
```bash
# Regenerate .env
cd /opt/astrapanel
sudo ./update.sh

# Or manually
cd /opt/astrapanel/server
echo "JWT_SECRET=$(openssl rand -base64 32)" | sudo tee .env
pm2 restart astrapanel
```

---

## 📚 **References**

- `.env.example` - Environment variable template
- `install.sh` - Auto-generation script (Lines 95-110)
- `server/middleware/authMiddleware.js` - JWT verification
- `server/controllers/authController.js` - JWT token creation

---

**Security = Simplicity for users + Complexity for attackers** 🔐

Your explanation was **100% correct!** This is exactly how professional applications handle secrets.
