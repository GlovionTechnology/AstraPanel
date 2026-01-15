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
