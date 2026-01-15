const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "HiteshBhaiKaSuperSecretKey"; 

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find user
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return res.status(500).json({ error: "Server Error" });
        if (!user) return res.status(401).json({ error: "User not found!" });

        // Match password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({ error: "Wrong Password!" });

        // Create token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });

        res.json({ 
            message: "Login Successful! 🔓",
            token: token,
            user: { username: user.username }
        });
    });
};
