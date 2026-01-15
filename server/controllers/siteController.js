const db = require('../config/database');
const runCommand = require('../utils/shell');

exports.createSite = async (req, res) => {
    const { domain_name, port, php_version } = req.body;

    // 1. Validation
    if (!domain_name) return res.status(400).json({ error: "Domain Name is required" });

    try {
        // 2. Database me entry (Ye record ke liye hai)
        const insertSQL = "INSERT INTO sites (domain_name, port, php_version) VALUES (?, ?, ?)";
        
        db.run(insertSQL, [domain_name, port || 80, php_version || 'Node'], async function(err) {
            if (err) {
                return res.status(500).json({ error: "Database Error: Domain shayad pehle se exist karta hai." });
            }

            const siteId = this.lastID;

            // 3. SYSTEM COMMANDS (Simulation Mode for Windows)
            // Asli Linux server par hum ye commands chalayenge:
            // 1. mkdir /var/www/domain.com
            // 2. Write Nginx Config
            // 3. systemctl reload nginx
            
            console.log(`🛠️ [System Action] Creating folder for: /var/www/${domain_name}`);
            console.log(`🛠️ [System Action] Generating Nginx Config for port: ${port || 80}`);

            // Agar hum Linux par hote, to ye run karte:
            // await runCommand(`mkdir -p /var/www/${domain_name}`);
            // await runCommand(`systemctl reload nginx`);

            res.json({ 
                message: `🚀 Site '${domain_name}' created successfully!`,
                site_id: siteId,
                status: "Live (Simulated)"
            });
        });

    } catch (error) {
        res.status(500).json({ error: "Site Creation Failed" });
    }
};

exports.getAllSites = (req, res) => {
    db.all("SELECT * FROM sites", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ sites: rows });
    });
};
