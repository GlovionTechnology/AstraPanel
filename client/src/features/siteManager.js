import BrainClient from '../utils/brainClient';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * 🌐 Site Manager
 * Manages website operations using Brain's encrypted code execution
 * 
 * Features:
 * - Create/Delete sites using Brain logic
 * - Install SSL certificates
 * - Configure Nginx
 * - Install WordPress (PRO feature)
 * - Setup firewall rules (PRO feature)
 * - Auto backups (PRO feature)
 * - PHP version switching (PRO feature)
 */
class SiteManager {
  /**
   * Initialize Site Manager
   * @param {string} licenseKey - User's license key
   */
  constructor(licenseKey) {
    if (!licenseKey) {
      throw new Error('License key is required');
    }
    
    this.brain = new BrainClient(licenseKey);
    this.sitesRoot = '/home/sites';
  }

  /**
   * 🆕 Create new website
   * FREE feature - Available in all plans
   * 
   * @param {string} domain - Domain name (e.g., example.com)
   * @param {string} phpVersion - PHP version (default: 8.2)
   * @returns {Promise<object>} Creation result
   */
  async createSite(domain, phpVersion = '8.2') {
    try {
      console.log(`🌐 Creating site: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain, decrypt, and execute in RAM
      const result = await this.brain.executeFeature('create_site', {
        domain,
        rootPath,
        phpVersion,
      });
      
      // Extract commands from executed code
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, rootPath);
      
      // Execute commands locally
      console.log('⚡ Executing site creation commands...');
      await this.executeCommands(commands);
      
      console.log('✅ Site created successfully!');
      
      return {
        success: true,
        domain,
        rootPath,
        phpVersion,
        message: `Site ${domain} created successfully`,
      };
      
    } catch (error) {
      console.error('❌ Failed to create site:', error);
      throw new Error(`Site creation failed: ${error.message}`);
    }
  }

  /**
   * 🗑️ Delete website
   * FREE feature - Available in all plans
   * 
   * @param {string} domain - Domain name to delete
   * @returns {Promise<object>} Deletion result
   */
  async deleteSite(domain) {
    try {
      console.log(`🗑️ Deleting site: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain
      const result = await this.brain.executeFeature('delete_site', {
        domain,
        rootPath,
      });
      
      // Extract and execute deletion commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, rootPath);
      
      console.log('⚡ Executing site deletion commands...');
      await this.executeCommands(commands);
      
      console.log('✅ Site deleted successfully!');
      
      return {
        success: true,
        domain,
        message: `Site ${domain} deleted successfully`,
      };
      
    } catch (error) {
      console.error('❌ Failed to delete site:', error);
      throw new Error(`Site deletion failed: ${error.message}`);
    }
  }

  /**
   * 🔒 Install SSL certificate
   * FREE feature - Available in all plans
   * 
   * @param {string} domain - Domain name
   * @param {string} email - Admin email for Let's Encrypt
   * @returns {Promise<object>} SSL installation result
   */
  async installSSL(domain, email) {
    try {
      console.log(`🔒 Installing SSL for: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain
      const result = await this.brain.executeFeature('ssl_cert', {
        domain,
        email,
        rootPath,
      });
      
      // Extract and execute SSL commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, email, rootPath);
      
      console.log('⚡ Executing SSL installation commands...');
      await this.executeCommands(commands);
      
      console.log('✅ SSL installed successfully!');
      
      return {
        success: true,
        domain,
        message: `SSL certificate installed for ${domain}`,
      };
      
    } catch (error) {
      console.error('❌ Failed to install SSL:', error);
      throw new Error(`SSL installation failed: ${error.message}`);
    }
  }

  /**
   * ⚙️ Configure Nginx
   * FREE feature - Available in all plans
   * 
   * @param {string} domain - Domain name
   * @param {object} config - Nginx configuration options
   * @returns {Promise<object>} Configuration result
   */
  async configureNginx(domain, config = {}) {
    try {
      console.log(`⚙️ Configuring Nginx for: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain
      const result = await this.brain.executeFeature('nginx_config', {
        domain,
        rootPath,
        phpVersion: config.phpVersion || '8.2',
        enableSSL: config.enableSSL || false,
      });
      
      // Extract and execute configuration commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, rootPath);
      
      console.log('⚡ Executing Nginx configuration commands...');
      await this.executeCommands(commands);
      
      console.log('✅ Nginx configured successfully!');
      
      return {
        success: true,
        domain,
        message: `Nginx configured for ${domain}`,
      };
      
    } catch (error) {
      console.error('❌ Failed to configure Nginx:', error);
      throw new Error(`Nginx configuration failed: ${error.message}`);
    }
  }

  /**
   * 🔥 Install WordPress (PRO Feature)
   * Requires PRO or ENTERPRISE plan
   * 
   * @param {string} domain - Domain name
   * @param {object} wpConfig - WordPress configuration
   * @returns {Promise<object>} Installation result
   */
  async installWordPress(domain, wpConfig) {
    try {
      console.log(`🔥 Installing WordPress for: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      const dbName = domain.replace(/\./g, '_');
      
      // Request code from Brain (will check PRO license)
      const result = await this.brain.executeFeature('wp_installer', {
        domain,
        rootPath,
        dbName,
        dbUser: wpConfig.dbUser || 'wp_user',
        dbPass: wpConfig.dbPass || this.generatePassword(),
        adminUser: wpConfig.adminUser,
        adminPass: wpConfig.adminPass,
        adminEmail: wpConfig.adminEmail,
      });
      
      // Extract and execute WordPress installation commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(
        domain,
        rootPath,
        dbName,
        wpConfig.dbUser,
        wpConfig.dbPass,
        wpConfig.adminUser,
        wpConfig.adminPass,
        wpConfig.adminEmail
      );
      
      console.log('⚡ Executing WordPress installation commands...');
      await this.executeCommands(commands);
      
      console.log('✅ WordPress installed successfully!');
      
      return {
        success: true,
        domain,
        wpUrl: `https://${domain}`,
        adminUrl: `https://${domain}/wp-admin`,
        adminUser: wpConfig.adminUser,
        message: `WordPress installed on ${domain}`,
      };
      
    } catch (error) {
      if (error.message.includes('Upgrade Required')) {
        throw new Error('WordPress installer requires PRO or ENTERPRISE plan. Please upgrade your license.');
      }
      console.error('❌ Failed to install WordPress:', error);
      throw new Error(`WordPress installation failed: ${error.message}`);
    }
  }

  /**
   * 🛡️ Setup firewall rules (PRO Feature)
   * Requires PRO or ENTERPRISE plan
   * 
   * @param {string} domain - Domain name
   * @param {object} rules - Firewall rules
   * @returns {Promise<object>} Setup result
   */
  async setupFirewall(domain, rules = {}) {
    try {
      console.log(`🛡️ Setting up firewall for: ${domain}`);
      
      // Request code from Brain (will check PRO license)
      const result = await this.brain.executeFeature('firewall_setup', {
        domain,
        allowedPorts: rules.allowedPorts || [80, 443],
        allowedIPs: rules.allowedIPs || [],
        blockCountries: rules.blockCountries || [],
      });
      
      // Extract and execute firewall commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, rules.allowedPorts);
      
      console.log('⚡ Executing firewall setup commands...');
      await this.executeCommands(commands);
      
      console.log('✅ Firewall configured successfully!');
      
      return {
        success: true,
        domain,
        message: `Firewall configured for ${domain}`,
      };
      
    } catch (error) {
      if (error.message.includes('Upgrade Required')) {
        throw new Error('Firewall setup requires PRO or ENTERPRISE plan. Please upgrade your license.');
      }
      console.error('❌ Failed to setup firewall:', error);
      throw new Error(`Firewall setup failed: ${error.message}`);
    }
  }

  /**
   * 💾 Setup auto backups (PRO Feature)
   * Requires PRO or ENTERPRISE plan
   * 
   * @param {string} domain - Domain name
   * @param {object} backupConfig - Backup configuration
   * @returns {Promise<object>} Setup result
   */
  async setupAutoBackup(domain, backupConfig = {}) {
    try {
      console.log(`💾 Setting up auto backup for: ${domain}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain (will check PRO license)
      const result = await this.brain.executeFeature('auto_backup', {
        domain,
        rootPath,
        schedule: backupConfig.schedule || 'daily',
        retention: backupConfig.retention || 7,
      });
      
      // Extract and execute backup setup commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(
        domain,
        rootPath,
        backupConfig.schedule,
        backupConfig.retention
      );
      
      console.log('⚡ Executing backup setup commands...');
      await this.executeCommands(commands);
      
      console.log('✅ Auto backup configured successfully!');
      
      return {
        success: true,
        domain,
        schedule: backupConfig.schedule,
        message: `Auto backup configured for ${domain}`,
      };
      
    } catch (error) {
      if (error.message.includes('Upgrade Required')) {
        throw new Error('Auto backup requires PRO or ENTERPRISE plan. Please upgrade your license.');
      }
      console.error('❌ Failed to setup auto backup:', error);
      throw new Error(`Auto backup setup failed: ${error.message}`);
    }
  }

  /**
   * 🔄 Switch PHP version (PRO Feature)
   * Requires PRO or ENTERPRISE plan
   * 
   * @param {string} domain - Domain name
   * @param {string} phpVersion - PHP version (e.g., '8.2', '8.1', '7.4')
   * @returns {Promise<object>} Switch result
   */
  async switchPHPVersion(domain, phpVersion) {
    try {
      console.log(`🔄 Switching PHP version for ${domain} to ${phpVersion}`);
      
      const rootPath = `${this.sitesRoot}/${domain}`;
      
      // Request code from Brain (will check PRO license)
      const result = await this.brain.executeFeature('php_version_switch', {
        domain,
        rootPath,
        phpVersion,
      });
      
      // Extract and execute PHP switch commands
      const codeModule = result.default;
      const commands = codeModule.getCommands(domain, rootPath, phpVersion);
      
      console.log('⚡ Executing PHP version switch commands...');
      await this.executeCommands(commands);
      
      console.log('✅ PHP version switched successfully!');
      
      return {
        success: true,
        domain,
        phpVersion,
        message: `PHP version switched to ${phpVersion} for ${domain}`,
      };
      
    } catch (error) {
      if (error.message.includes('Upgrade Required')) {
        throw new Error('PHP version switching requires PRO or ENTERPRISE plan. Please upgrade your license.');
      }
      console.error('❌ Failed to switch PHP version:', error);
      throw new Error(`PHP version switch failed: ${error.message}`);
    }
  }

  /**
   * Execute shell commands locally
   * @private
   */
  async executeCommands(commands) {
    for (const [key, cmdArray] of Object.entries(commands)) {
      if (Array.isArray(cmdArray)) {
        for (const cmd of cmdArray) {
          console.log(`  → ${cmd}`);
          await execAsync(cmd);
        }
      } else {
        console.log(`  → ${cmdArray}`);
        await execAsync(cmdArray);
      }
    }
  }

  /**
   * Generate secure random password
   * @private
   */
  generatePassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    return password;
  }
}

export default SiteManager;
