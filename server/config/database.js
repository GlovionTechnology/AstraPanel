// File: server/config/database.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Set the database file path
const dbPath = path.resolve(__dirname, '../astrapanel.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database Connection Error:', err.message);
    } else {
        console.log('✅ SQLite Database Connected (Vault Ready)');
    }
});

// Create tables and Admin User
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    // SITES Table Create karna
    db.run(`CREATE TABLE IF NOT EXISTS sites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain_name TEXT UNIQUE,
        port INTEGER,
        app_type TEXT DEFAULT 'PHP',
        version TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Migration: Add columns if they don't exist (for existing databases)
    db.run(`ALTER TABLE sites ADD COLUMN app_type TEXT DEFAULT 'PHP'`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Migration error (app_type):', err.message);
        }
    });
    db.run(`ALTER TABLE sites ADD COLUMN version TEXT`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Migration error (version):', err.message);
        }
    });
    
    console.log("✅ Sites Table Ready");

    // Default Admin Check
    const checkAdmin = "SELECT * FROM users WHERE username = ?";
    db.get(checkAdmin, ['admin'], (err, row) => {
        if (!row) {
            const password = 'password123';
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const insert = "INSERT INTO users (username, password) VALUES (?, ?)";
            db.run(insert, ['admin', hash], (err) => {
                if (err) console.log(err);
                else console.log("👤 Default Admin Created: (User: admin, Pass: password123)");
            });
        }
    });
});

module.exports = db;
