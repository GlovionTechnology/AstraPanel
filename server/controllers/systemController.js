const si = require('systeminformation');
const runCommand = require('../utils/shell'); // Our new Muscle 💪

exports.getStats = async (req, res) => {
    try {
        // 1. Hardware Stats (From Library)
        const cpu = await si.currentLoad();
        const mem = await si.mem();
        const os = await si.osInfo();
        const disk = await si.fsSize();

        // 2. Service Stats (From Real Linux Commands) 
        // Check if Nginx and SQL services are active
        let nginxStatus = 'Inactive 🔴';
        try {
            // Run systemctl command
            const output = await runCommand('systemctl is-active nginx');
            if (output === 'active') nginxStatus = 'Active 🟢';
        } catch (e) {
            nginxStatus = 'Not Installed ⚪';
        }

        res.json({
            hardware: {
                cpu: Math.round(cpu.currentLoad) + "%",
                ram_total: (mem.total / 1024 / 1024 / 1024).toFixed(2) + " GB",
                ram_used: (mem.active / 1024 / 1024 / 1024).toFixed(2) + " GB",
                disk_used: disk.length > 0 ? disk[0].use + "%" : "N/A",
            },
            os: {
                platform: os.distro,
                uptime: (os.uptime / 3600).toFixed(2) + " Hours"
            },
            services: {
                nginx: nginxStatus,
                database: "SQLite (Embedded) 🟢" 
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching system stats' });
    }
};
