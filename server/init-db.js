// Database Initialization Script
// Run this once to setup database: node init-db.js

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'config/astrapanel.db');

console.log('========================================');
console.log('  🔧 AstraPanel Database Initializer');
console.log('========================================');
console.log('Database Path:', dbPath);
console.log('');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database Connection Error:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Database Connected');
    }
});

db.serialize(() => {
    console.log('[1/3] Creating users table...');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('❌ Error creating users table:', err.message);
        } else {
            console.log('✅ Users table created');
        }
    });

    console.log('[2/3] Creating sites table...');
    db.run(`CREATE TABLE IF NOT EXISTS sites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain_name TEXT UNIQUE NOT NULL,
        port INTEGER,
        app_type TEXT DEFAULT 'Static',
        version TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('❌ Error creating sites table:', err.message);
        } else {
            console.log('✅ Sites table created');
        }
    });

    console.log('[3/3] Creating default admin user...');
    const checkAdmin = "SELECT * FROM users WHERE username = ?";
    db.get(checkAdmin, ['admin'], (err, row) => {
        if (err) {
            console.error('❌ Error checking admin:', err.message);
            return;
        }

        if (!row) {
            const password = 'admin123';
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const insert = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.run(insert, ['admin', hash], (err) => {
                if (err) {
                    console.error('❌ Error creating admin:', err.message);
                } else {
                    console.log('✅ Default admin created');
                    console.log('');
                    console.log('========================================');
                    console.log('  ✅ DATABASE INITIALIZED!');
                    console.log('========================================');
                    console.log('');
                    console.log('🔐 Default Login Credentials:');
                    console.log('   Username: admin');
                    console.log('   Password: admin123');
                    console.log('');
                    console.log('⚠️  Change password after first login!');
                    console.log('========================================');
                }
                db.close();
            });
        } else {
            console.log('⚠️  Admin already exists, skipping...');
            console.log('');
            console.log('========================================');
            console.log('  ✅ DATABASE READY!');
            console.log('========================================');
            db.close();
        }
    });
});
