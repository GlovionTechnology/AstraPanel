const db = require('../config/database');
const runCommand = require('../utils/shell');
const fs = require('fs');
const path = require('path');

exports.createSite = async (req, res) => {
    const { 
        domain_name, 
        port, 
        app_type, 
        version, 
        app_port, 
        proxy_url, 
        site_user, 
        site_user_password,
        site_title,
        admin_username,
        admin_password,
        admin_email,
        multisite
    } = req.body;

    // 1. Validation
    if (!domain_name) return res.status(400).json({ error: "Domain Name is required" });

    try {
        // 2. Database me entry (Ye record ke liye hai)
        const insertSQL = "INSERT INTO sites (domain_name, port, app_type, version) VALUES (?, ?, ?, ?)";
        
        db.run(insertSQL, [domain_name, port || 80, app_type || 'PHP', version], async function(err) {
            if (err) {
                return res.status(500).json({ error: "Database Error: Domain shayad pehle se exist karta hai." });
            }

            const siteId = this.lastID;

            // 3. CREATE ACTUAL SITE FOLDER STRUCTURE
            const hostedSitesPath = path.join(__dirname, '..', 'hosted_sites');
            const sitePath = path.join(hostedSitesPath, domain_name);
            
            try {
                // Create main site directory
                if (!fs.existsSync(sitePath)) {
                    fs.mkdirSync(sitePath, { recursive: true });
                    console.log(`✅ Created site folder: ${sitePath}`);
                }

                // Create subdirectories based on app type
                let foldersToCreate = [];
                
                switch(app_type) {
                    case 'PHP':
                    case 'WordPress':
                        foldersToCreate = ['public_html', 'logs', 'ssl', 'backups'];
                        break;
                    case 'Node.js':
                        foldersToCreate = ['app', 'logs', 'ssl', 'backups', 'node_modules'];
                        break;
                    case 'Python':
                        foldersToCreate = ['app', 'logs', 'ssl', 'backups', 'venv'];
                        break;
                    case 'Static':
                        foldersToCreate = ['public', 'logs', 'ssl', 'backups'];
                        break;
                    case 'Reverse Proxy':
                        foldersToCreate = ['logs', 'ssl', 'config'];
                        break;
                }

                // Create all subdirectories
                foldersToCreate.forEach(folder => {
                    const folderPath = path.join(sitePath, folder);
                    if (!fs.existsSync(folderPath)) {
                        fs.mkdirSync(folderPath, { recursive: true });
                    }
                });

                // Create a site info file
                const siteInfo = {
                    domain_name,
                    app_type,
                    version,
                    port: port || 80,
                    app_port: app_port || null,
                    proxy_url: proxy_url || null,
                    site_user: site_user || `user_${domain_name.replace(/\./g, '_')}`,
                    created_at: new Date().toISOString(),
                    site_id: siteId
                };

                if (app_type === 'WordPress') {
                    siteInfo.wordpress = {
                        site_title,
                        admin_username,
                        admin_email,
                        multisite: multisite || false
                    };
                }

                fs.writeFileSync(
                    path.join(sitePath, 'site-info.json'),
                    JSON.stringify(siteInfo, null, 2)
                );

                console.log(`✅ Site structure created successfully for: ${domain_name}`);
                console.log(`📁 Location: ${sitePath}`);
                console.log(`📦 Folders: ${foldersToCreate.join(', ')}`);

            } catch (folderError) {
                console.error(`❌ Error creating site folders: ${folderError.message}`);
            }

            res.json({ 
                message: `🚀 Site '${domain_name}' created successfully!`,
                site_id: siteId,
                site_path: sitePath,
                status: "Active"
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
